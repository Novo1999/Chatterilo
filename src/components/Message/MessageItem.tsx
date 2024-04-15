import useGetUser from '@/hooks/api/useGetUser'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface Conversation {
  messages: any[]
  currentUserId: string
  recipientUserId: string
  _id: string
}

const MessageItem = ({ conversation }: { conversation: Conversation }) => {
  const {
    messages,
    currentUserId,
    recipientUserId,
    _id: conversationId,
  } = conversation
  const { data: recipient } = useGetUser(recipientUserId)

  return (
    <motion.div
      initial={{ opacity: 0, x: -300 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.95 }}
      className='grid grid-cols-[50px_160px_50px] min-[375px]:grid-cols-[50px_215px_40px] min-[425px]:grid-cols-[50px_265px_50px] md:grid-cols-[50px_170px_50px] lg:grid-cols-[50px_250px_50px] gap-4 xl:grid-cols-[50px_250px_50px] *:text-gray-200 cursor-pointer hover:bg-slate-500 py-4'
    >
      <Image
        src='https://i.pravatar.cc/300'
        width={300}
        height={300}
        className='size-12 rounded-full'
        alt='avatar'
      />
      <div className='text-xs'>
        <p className='font-bold'>Novodip Mondal</p>
        <div className='*:text-gray-400'>
          <p className='block min-[375px]:hidden'>
            {`${
              messages.length > 0
                ? messages[messages.length - 1].content.slice(1, 40)
                : `Start a conversation with ${recipient?.data.username}`
            }...`}
          </p>
          <p className='hidden min-[375px]:block min-[425px]:hidden'>
            {`${
              messages.length > 0
                ? messages[messages.length - 1].content.slice(1, 50)
                : `Start a conversation with ${recipient?.data.username}`
            }...`}
          </p>
          <p className='hidden min-[425px]:block'>
            {`${
              messages.length > 0
                ? messages[messages.length - 1].content.slice(1, 80)
                : `Start a conversation with ${recipient?.data.username}`
            }...`}
          </p>
        </div>
      </div>
      <div className='text-xs font-thin'>
        <p className='text-blue-200'>4:03pm</p>
      </div>
    </motion.div>
  )
}
export default MessageItem
