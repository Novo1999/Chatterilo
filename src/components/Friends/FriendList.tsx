import useGetFriendsList from '@/hooks/api/useGetFriendsList'
import useUnfriend from '@/hooks/api/useUnfriend'
import useAuthContext from '@/hooks/contextHooks/useAuthContext'
import useConnectedUserContext from '@/hooks/contextHooks/useConnectedUserContext'
import useMenuAnimation from '@/hooks/useMenuAnimation'
import { socket } from '@/lib/socket'
import { Loader, MessageCircle, Trash } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { CgClose } from 'react-icons/cg'
import { TbMoodEmpty } from 'react-icons/tb'
import { CloseButton } from '../Button'
import SpringModal from '../misc/SpringModal'
import { Button } from '../ui/button'

const FriendList = ({
  isOpen,
  handleCloseMenu,
}: {
  isOpen: boolean
  handleCloseMenu: () => void
}) => {
  const scope = useMenuAnimation(isOpen)
  let { user: { friends, username } = {} } = useAuthContext()
  friends = useGetFriendsList(friends, isOpen)
  const [modalOpen, setModalOpen] = useState(false)
  const { mutate: unfriendMutate } = useUnfriend()
  const { connectedUsers } = useConnectedUserContext()

  // unfriend user
  const handleUnfriend = (id: string) => {
    const userSocketId = connectedUsers.find((user) => user.id === id)?.socketId
    unfriendMutate(id, {
      onSuccess: () => {
        if (!userSocketId) return

        socket.emit('invalidate-user', { socketId: userSocketId })
      },
    })
  }

  return (
    <nav className='font-poppins w-full' ref={scope}>
      <ul
        className='bg-white max-h-60 friend-content overflow-y-scroll search-menu text-black p-2 flex flex-col gap-2 w-screen md:w-96 text-sm absolute md:-left-20 -right-[2px] top-12 text-center'
        style={{
          clipPath: 'inset(10% 50% 90% 50% round 10px)',
        }}
      >
        <div className='flex-between'>
          <div className='p-bold-20'>My Friends</div>
          <CloseButton onClick={handleCloseMenu}>
            <CgClose />
          </CloseButton>
        </div>
        <li className='hidden'></li>
        {friends?.length > 0 ? (
          friends?.map((friend) =>
            friend.isLoading ? (
              <div
                className='flex-center'
                key={friend?.data?._id ?? crypto.randomUUID()}
              >
                <Loader className='animate-spin' />
              </div>
            ) : (
              <li key={friend?.data?._id ?? crypto.randomUUID()}>
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
                        <div>{friend?.data?.username}</div>
                      </div>
                    </div>
                    <div className='flex gap-2'>
                      {/* message friend */}
                      <Button
                        asChild
                        variant='ghost'
                        className='text-xl w-8 px-2 bg-green-400 hover:bg-green-500'
                      >
                        <MessageCircle />
                      </Button>
                      {createPortal(
                        <SpringModal
                          onClick={() => handleUnfriend(friend?.data?._id)}
                          message='Are you sure?'
                          modalOpen={modalOpen}
                          setModalOpen={setModalOpen}
                        />,
                        document.body
                      )}
                      {/* decline friend request */}
                      <Button
                        onClick={() => setModalOpen(true)}
                        asChild
                        className='text-xl px-2 w-8 bg-red-400 hover:bg-red-500'
                      >
                        <Trash className='text-xl' />
                      </Button>
                    </div>
                  </div>
                </Link>
              </li>
            )
          )
        ) : (
          <div className='p-4 friend-content bg-gray-300 rounded-md min-h-32 border-dotted border-black border-2 flex-col flex-center'>
            <div className='flex gap-2 flex-center text-md'>
              <p>No Friends, {username} is lonely</p>
              <TbMoodEmpty />
            </div>
          </div>
        )}
      </ul>{' '}
    </nav>
  )
}
export default FriendList
