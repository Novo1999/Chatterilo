import useCreateConversation from '@/hooks/api/useCreateConversation'
import useUnfriend from '@/hooks/api/useUnfriend'
import useAuthContext from '@/hooks/contextHooks/useAuthContext'
import useConnectedUserContext from '@/hooks/contextHooks/useConnectedUserContext'
import useMenuAnimation from '@/hooks/useMenuAnimation'
import { socket } from '@/lib/socket'
import { motion } from 'framer-motion'
import { MessageCircle, Trash } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { CgClose } from 'react-icons/cg'
import { TbMoodEmpty } from 'react-icons/tb'
import { CloseButton } from '../Button'
import SpringModal from '../misc/SpringModal'
import { Button } from '../ui/button'

const FriendList = ({ isOpen, handleCloseMenu }: IFriend) => {
  const scope = useMenuAnimation(isOpen)
  let { user: { friends, username, conversations } = {} } = useAuthContext()
  console.log('🚀 ~ FriendList ~ conversations:', conversations)
  const [modalOpen, setModalOpen] = useState(false)
  const { mutate: unfriendMutate } = useUnfriend()
  const { connectedUsers } = useConnectedUserContext()
  const { mutate: createConversationMutate } = useCreateConversation()

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

  // creates a new conversation
  const handleCreateConversation = (id: string) => {
    createConversationMutate(id)
  }

  const portalContent = (
    <nav className='font-poppins w-full' ref={scope}>
      <ul
        className='bg-white max-h-60 min-h-52 friend-content overflow-y-scroll search-menu text-black p-2 flex flex-col gap-2 w-screen md:w-96 text-sm absolute md:left-20 top-24 text-center'
        style={{
          clipPath: 'inset(10% 50% 90% 50% round 10px)',
        }}
      >
        <div className='flex-between'>
          <div className='italic text-blue-600'>
            My Friends{' '}
            <span className='text-xs relative bottom-0.5'>
              ({friends?.length})
            </span>
          </div>
          <CloseButton onClick={handleCloseMenu}>
            <CgClose />
          </CloseButton>
        </div>
        <li className='hidden'></li>
        {friends?.length! > 0 ? (
          friends?.map((friend) => {
            const friendIsInConversation =
              conversations?.findIndex(
                ({ recipientUser }) => friend._id === recipientUser
              ) === -1
            return (
              <li key={friend?._id}>
                <Link
                  href={`/`}
                  className='flex w-full max-w-sm m-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800'
                >
                  <div className='flex items-center justify-between px-2 py-3 w-full'>
                    <div className='flex gap-2 items-center'>
                      <img
                        className='object-cover w-10 h-10 rounded-full'
                        alt='User avatar'
                        src='https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200'
                      />
                      <div className='mx-3'>
                        <div className='flex gap-2 items-center'>
                          <p>{friend?.username}</p>
                          {/* active or inactive */}
                          {connectedUsers
                            .map((user) => user.id)
                            .includes(friend?._id) ? (
                            <div className='rounded-full bg-green-500 size-3' />
                          ) : (
                            <div className='rounded-full bg-gray-500 size-3' />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className='flex gap-2'>
                      {/* message friend */}
                      <motion.div
                        initial={{ opacity: 1 }}
                        animate={
                          conversations?.includes(friend._id) && {
                            opacity: 0,
                            scale: 0,
                          }
                        }
                      >
                        {/* message the user */}
                        {friendIsInConversation && (
                          <Button
                            onClick={() =>
                              handleCreateConversation(friend?._id)
                            }
                            asChild
                            variant='ghost'
                            className='text-xl w-8 px-2 bg-green-400 hover:bg-green-500'
                          >
                            <MessageCircle />
                          </Button>
                        )}
                      </motion.div>
                      {createPortal(
                        <SpringModal
                          onClick={() => handleUnfriend(friend?._id)}
                          message='Are you sure?'
                          modalOpen={modalOpen}
                          setModalOpen={setModalOpen}
                        />,
                        document.body
                      )}
                      {/* unfriend */}
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
          })
        ) : (
          <div className='p-4 friend-content bg-gray-300 rounded-md min-h-32 border-dotted border-black border-2 flex-col flex-center'>
            <div className='flex gap-2 flex-center text-md'>
              <p>No Friends, {username} is lonely</p>
              <TbMoodEmpty />
            </div>
          </div>
        )}
      </ul>
    </nav>
  )

  if (typeof window === 'object') {
    return createPortal(portalContent, document.body)
  }

  return null
}
export default FriendList
