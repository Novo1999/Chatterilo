import useFriendRequest from '@/hooks/api/useFriendRequest'
import useManageFriendRequest from '@/hooks/api/useManageFriendRequest'
import useSearchUsers from '@/hooks/api/useSearchUsers'
import useAuthContext from '@/hooks/contextHooks/useAuthContext'
import useConnectedUserContext from '@/hooks/contextHooks/useConnectedUserContext'
import useMenuAnimation from '@/hooks/useMenuAnimation'
import { socket } from '@/lib/socket'
import getEmojiForSearchedUser from '@/utils/search/getEmojiForSearchedUser'
import getFunctionalityForSearchedUserButton from '@/utils/search/getFunctionalityForSearchedUser'
import { useQueryClient } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import { CheckCircle, Info, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { MouseEvent, useEffect } from 'react'
import toast from 'react-hot-toast'
import { BiSolidMessageError } from 'react-icons/bi'
import { FaCheckCircle } from 'react-icons/fa'
import { IoMdPersonAdd } from 'react-icons/io'
import { LiaUserFriendsSolid } from 'react-icons/lia'
import { TbMoodEmpty } from 'react-icons/tb'
import ErrorResponse from './misc/ErrorResponse'
import TooltipContainer from './ui/TooltipContainer'

const SearchList = ({
  isOpen,
  inputValue,
}: {
  isOpen: boolean
  inputValue: string
}) => {
  const scope = useMenuAnimation(isOpen)
  const { user: { friendRequests, _id, username, friends } = {} } =
    useAuthContext()
  const { mutate: sendFriendRequestMutate } = useFriendRequest('send')
  const { mutate: cancelFriendRequestMutate } = useFriendRequest('cancel')
  const queryClient = useQueryClient()
  const { connectedUsers } = useConnectedUserContext()
  const debouncedSearchTerm = useDebounce(inputValue, 300)
  const {
    data: { data: searchData } = {},
    isLoading,
    isError,
    error,
  } = useSearchUsers(debouncedSearchTerm)

  useEffect(() => {
    socket.on('friend_request', ({ from, requestMethod }) => {
      queryClient.invalidateQueries({ queryKey: ['current-user'] })
      // only show notification if user has sent the friend request and not cancelled
      if (requestMethod === 'SEND') {
        toast.success(`${from} sent you a friend request`, { icon: <Info /> })
      }
    })

    socket.on('invalidate', () => {
      queryClient.invalidateQueries({ queryKey: ['current-user'] })
    })

    return () => {
      socket.off('friend_request')
      socket.off('invalidate')
    }
  }, [])

  // add friend request
  const handleAddFriend = (e: MouseEvent, id: string) => {
    e.preventDefault()
    const matchedConnectedUser = connectedUsers.find((user) => user.id === id)
    sendFriendRequestMutate(id, {
      // emit an event so that can then invalidate the query of the receiver's client
      onSuccess: () =>
        socket.emit('friend-request', {
          matchedConnectedUser,
          from: username,
          requestMethod: 'SEND',
        }),
    })
  }

  // cancel friend request
  const handleCancelFriend = (e: MouseEvent, id: string) => {
    e.preventDefault()
    const matchedConnectedUser = connectedUsers.find((user) => user.id === id)
    cancelFriendRequestMutate(id, {
      onSuccess: () =>
        socket.emit('friend-request', {
          matchedConnectedUser,
          requestMethod: 'CANCEL',
        }),
    })
  }

  let content = null

  if (isLoading && !isError) {
    content = (
      <div className='min-h-32 flex-center'>
        <Loader2 className='animate-spin' />
      </div>
    )
  }

  if (!isLoading && isError) {
    content = (
      <ErrorResponse>
        <div className='flex-center flex-col min-h-32'>
          <BiSolidMessageError />
          <p className='text-red-500'>{error.message ?? 'Error Occurred'}</p>
        </div>
      </ErrorResponse>
    )
  }

  if (!isLoading && !isError && searchData?.length === 0) {
    content = (
      <div className='p-4 friend-content bg-gray-300 rounded-md min-h-32 border-dotted border-black flex-col flex-center'>
        <div className='flex gap-2 flex-center text-xl'>
          <p>No User Found</p>
          <TbMoodEmpty />
        </div>
      </div>
    )
  }

  const { mutate: acceptMutate } = useManageFriendRequest('ACCEPT')

  const acceptFriendRequest = (id: string) => {
    const userSocketId = connectedUsers.find((user) => user.id === id)?.socketId
    acceptMutate(id, {
      onSuccess: () => {
        if (!userSocketId) return

        socket.emit('invalidate-user', { socketId: userSocketId })
      },
    })
  }

  if (!isLoading && !isError && searchData?.length > 0) {
    content = searchData?.map((user: IUser['user']) => {
      const isFriend = friends?.map((friend) => friend._id).includes(user?._id)
      const userSentFriendRequest = friendRequests?.sent?.includes(user?._id)
      const userReceivedFriendRequest = friendRequests?.received?.includes(
        user?._id
      )

      const conditions = [
        isFriend,
        userSentFriendRequest,
        userReceivedFriendRequest,
      ] as boolean[]

      const functions = [
        handleCancelFriend,
        acceptFriendRequest,
        handleAddFriend,
      ]
      const emoji = getEmojiForSearchedUser(conditions)

      return (
        <li key={user?._id}>
          <Link
            href='/'
            className='flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800'
          >
            <div className='flex items-center justify-evenly px-2 py-3 w-full'>
              <div className='flex gap-2 items-center'>
                <img
                  className='object-cover w-10 h-10 rounded-full'
                  alt='User avatar'
                  src='https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200'
                />
                <div className='mx-3'>
                  <div>{user?.username}</div>
                </div>
              </div>
              <button
                onClick={(e) =>
                  getFunctionalityForSearchedUserButton(
                    e as any,
                    conditions,
                    user?._id,
                    functions
                  )
                }
              >
                {emoji}
              </button>
            </div>
          </Link>
        </li>
      )
    })
  }
  return (
    <nav className='menu' ref={scope}>
      <ul
        className='bg-[#9FA2B2] max-h-60 overflow-y-auto search-menu text-black p-2 flex flex-col gap-2 md:w-72 w-screen absolute md:right-4 -right-[2px] top-12 text-center'
        style={{
          pointerEvents: isOpen ? 'auto' : 'none',
          clipPath: 'inset(10% 50% 90% 50% round 10px)',
        }}
      >
        {content}
        <li className='hidden'></li>
      </ul>
    </nav>
  )
}
export default SearchList
