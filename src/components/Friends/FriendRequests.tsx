import useGetFriendRequests from '@/hooks/api/useGetFriendRequests'
import useManageFriendRequest from '@/hooks/api/useManageFriendRequest'
import useAuthContext from '@/hooks/contextHooks/useAuthContext'
import useConnectedUserContext from '@/hooks/contextHooks/useConnectedUserContext'
import useMenuAnimation from '@/hooks/useMenuAnimation'
import { socket } from '@/lib/socket'
import { Loader } from 'lucide-react'
import Link from 'next/link'
import { RxCheck, RxCross2 } from 'react-icons/rx'
import { Button } from '../ui/button'

const FriendRequests = ({ isOpen }: { isOpen: boolean }) => {
  const scope = useMenuAnimation(isOpen)
  const { connectedUsers } = useConnectedUserContext()
  const { user: { friendRequests } = {} } = useAuthContext()
  const { mutate: declineMutate } = useManageFriendRequest('DECLINE')
  const { mutate: acceptMutate } = useManageFriendRequest('ACCEPT')
  // all friend requests list
  const results = useGetFriendRequests(
    friendRequests?.received as string[],
    isOpen
  )

  // mapped to object
  const friendRequestData = results.map((result) => ({
    userData: result.data,
    isLoading: result.isLoading,
  }))

  console.log(friendRequestData)

  const declineFriendRequest = (id: string) => {
    const userSocketId = connectedUsers.find((user) => user.id === id)?.socketId
    declineMutate(id, {
      onSuccess: () => {
        if (!userSocketId) return

        socket.emit('invalidate-user', { socketId: userSocketId })
      },
    })
  }

  const acceptFriendRequest = (id: string) => {
    const userSocketId = connectedUsers.find((user) => user.id === id)?.socketId
    acceptMutate(id, {
      onSuccess: () => {
        if (!userSocketId) return

        socket.emit('invalidate-user', { socketId: userSocketId })
      },
    })
  }

  return (
    <nav className='menu font-poppins w-full' ref={scope}>
      <ul
        className='bg-white max-h-60 overflow-y-scroll search-menu text-black p-2 flex flex-col gap-2 w-screen md:w-96 text-sm absolute md:-left-20 -right-[2px] top-12 text-center'
        style={{
          pointerEvents: isOpen ? 'auto' : 'none',
          clipPath: 'inset(10% 50% 90% 50% round 10px)',
        }}
      >
        <div className='p-bold-20'>Friend Requests</div>
        <li className='hidden'></li>
        {friendRequestData?.length > 0 &&
          friendRequestData?.map((friend) =>
            friend.isLoading ? (
              <div key={friend?.userData?._id ?? crypto.randomUUID()}>
                <Loader className='animate-spin' />
              </div>
            ) : (
              <li key={friend?.userData?._id ?? crypto.randomUUID()}>
                <Link
                  href='/'
                  className='flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800'
                >
                  <div className='flex items-center justify-between px-2 py-3 w-full'>
                    <div className='flex gap-2 items-center'>
                      <img
                        className='object-cover w-10 h-10 rounded-full'
                        alt='User avatar'
                        src='https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200'
                      />
                      <div className='mx-3'>
                        <div>{friend?.userData?.username}</div>
                      </div>
                    </div>
                    <div className='flex gap-2'>
                      {/* accept friend request */}
                      <Button
                        variant='ghost'
                        onClick={() =>
                          acceptFriendRequest(friend?.userData?._id)
                        }
                        className='text-xl px-2 bg-green-400 hover:bg-green-500'
                      >
                        <RxCheck />
                      </Button>
                      {/* decline friend request */}
                      <Button
                        onClick={() =>
                          declineFriendRequest(friend?.userData?._id)
                        }
                        className='text-xl px-2 bg-red-400 hover:bg-red-500'
                      >
                        <RxCross2 />
                      </Button>
                    </div>
                  </div>
                </Link>
              </li>
            )
          )}
      </ul>{' '}
    </nav>
  )
}
export default FriendRequests
