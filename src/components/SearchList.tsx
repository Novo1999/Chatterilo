import { User } from '@/context'
import useFriendRequest from '@/hooks/api/useFriendRequest'
import useAuthContext from '@/hooks/contextHooks/useAuthContext'
import useConnectedUserContext from '@/hooks/contextHooks/useConnectedUserContext'
import useMenuAnimation from '@/hooks/useMenuAnimation'
import { socket } from '@/lib/socket'
import { useQueryClient } from '@tanstack/react-query'
import { CheckCircle, Info } from 'lucide-react'
import Link from 'next/link'
import { MouseEvent, useEffect } from 'react'
import toast from 'react-hot-toast'
import { IoMdPersonAdd } from 'react-icons/io'
import { LiaUserFriendsSolid } from 'react-icons/lia'

const SearchList = ({
  isOpen,
  searchData,
}: {
  isOpen: boolean
  searchData: User['user'][]
}) => {
  const scope = useMenuAnimation(isOpen)
  const { user: { friendRequests, _id, username, friends } = {} } =
    useAuthContext()
  const { mutateAsync: sendFriendRequestMutate } = useFriendRequest('send')
  const { mutateAsync: cancelFriendRequestMutate } = useFriendRequest('cancel')
  const queryClient = useQueryClient()
  const { connectedUsers } = useConnectedUserContext()

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

  return (
    <nav className='menu' ref={scope}>
      <ul
        className='bg-white max-h-60 overflow-y-scroll search-menu text-black p-2 flex flex-col gap-2 w-screen md:w-72 absolute md:right-4 -right-[2px] top-12 text-center'
        style={{
          pointerEvents: isOpen ? 'auto' : 'none',
          clipPath: 'inset(10% 50% 90% 50% round 10px)',
        }}
      >
        <li className='hidden'></li>
        {searchData?.map((user: User['user']) => (
          <li key={user?._id}>
            <Link
              href='/'
              className='flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800'
            >
              <div className='flex items-center justify-evenly px-2 py-3 w-full'>
                <div className='flex gap-2 items-center'>
                  {friends?.includes(user?._id) && (
                    <div className='relative right-2'>
                      <LiaUserFriendsSolid />
                    </div>
                  )}

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
                  // check if current user sent request to the user , if sent, they can cancel it otherwise check if they are friends, if friends, then do nothing, else user can add as friend
                  onClick={(e) =>
                    friendRequests?.sent.includes(user?._id)
                      ? handleCancelFriend(e, user?._id)
                      : !friends?.includes(user?._id) &&
                        handleAddFriend(e, user?._id)
                  }
                >
                  {/* show the check only when user has sent this user friend request or has them as friend already */}
                  {friendRequests?.sent.includes(user?._id) ||
                  friends?.includes(user?._id) ? (
                    <CheckCircle />
                  ) : (
                    <IoMdPersonAdd className='text-xl' />
                  )}
                </button>
              </div>
            </Link>
          </li>
        ))}
      </ul>{' '}
    </nav>
  )
}
export default SearchList