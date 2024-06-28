import useGetUser from '@/hooks/api/useGetUser'
import useAuthContext from '@/hooks/contextHooks/useAuthContext'
import getReceiverDetails from '@/utils/chat/getReceiverDetails'
import { CURRENT_CHAT } from '@/utils/misc/constants'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import ConversationItemChildren from '../Message/ConversationItemChildren'

const ConversationListItem = ({
  conversation,
}: {
  conversation: IConversation
}) => {
  const { user: { username, friendRequests, _id: userId, friends } = {} } =
    useAuthContext()
  const { participant1, participant2, _id, lastMessage, messages } =
    conversation
  const receiverDetails =
    userId && getReceiverDetails(participant1, userId!, participant2)

  return (
    <motion.div
      initial={{ opacity: 1, x: -300 }}
      animate={{ opacity: 1, backgroundColor: '#16262E', x: 0 }}
      whileHover={{
        scale: 1.02,
        backgroundColor: '#243137',
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.95 }}
      className='rounded-md'
    >
      {/* takes to the message page when user is on mobile */}
      <Link
        className='flex sm:hidden justify-between items-center px-2 gap-2 *:text-gray-100 cursor-pointer py-4 rounded-md border border-white border-opacity-50 shadow-md'
        href={`messages/`}
        // TODO: add path id here
      >
        <div className='flex gap-4 items-center'>
          <div className='relative'>
            <Image
              src='https://i.pravatar.cc/300'
              width={300}
              height={300}
              className='w-12 rounded-full'
              alt='avatar'
            />
            {/* shows if user is online */}
            {true ? (
              <div className='rounded-full bg-green-500 size-3 absolute top-8 right-0'></div>
            ) : (
              <div className='rounded-full bg-gray-500 size-3 absolute top-10 right-0'></div>
            )}
          </div>
          <div className='text-xs'>
            <p className='font-bold'>{receiverDetails?.userName}</p>
            <div className='*:text-gray-100'>
              <p className='block min-[375px]:hidden'>{lastMessage}</p>
              <p className='hidden min-[375px]:block min-[425px]:hidden'>
                {lastMessage}
              </p>
              <p className='hidden min-[425px]:block'>{lastMessage}</p>
            </div>
          </div>
        </div>
        <div className='text-xs font-thin'>
          <p className='text-slate-100 italic font-light'>4:03pm</p>
        </div>
      </Link>
      <div
        // onClick={() => handleSelectChat(conversationId)}
        className='hidden sm:flex justify-between items-center px-2 gap-2 *:text-gray-100 cursor-pointer py-4 rounded-md border border-white border-opacity-50 shadow-md'
      >
        <div className='flex gap-4 items-center'>
          <div className='relative'>
            <Image
              src='https://i.pravatar.cc/300'
              width={300}
              height={300}
              className='w-12 rounded-full'
              alt='avatar'
            />
            {/* shows if user is online */}
            {true ? (
              <div className='rounded-full bg-green-500 size-3 absolute top-8 right-0'></div>
            ) : (
              <div className='rounded-full bg-gray-500 size-3 absolute top-10 right-0'></div>
            )}
          </div>
          <div className='text-xs'>
            <p className='font-bold'>{receiverDetails?.userName}</p>

            <div className='*:text-gray-100'>
              <p className='block min-[375px]:hidden'>{lastMessage}</p>
              <p className='hidden min-[375px]:block min-[425px]:hidden'>
                {lastMessage}
              </p>
              <p className='hidden min-[425px]:block'>{lastMessage}</p>
            </div>
          </div>
        </div>
        <div className='text-xs font-thin'>
          <p className='text-slate-100 italic font-light'>4:03pm</p>
        </div>
      </div>
    </motion.div>
  )
}
export default ConversationListItem
