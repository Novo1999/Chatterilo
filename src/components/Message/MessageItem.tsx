import useGetUser from '@/hooks/api/useGetUser'
import useConnectedUserContext from '@/hooks/contextHooks/useConnectedUserContext'
import {
  useMessagesContext,
  useMessagesDispatchContext,
} from '@/hooks/contextHooks/useMessagesContext'
import { CURRENT_CHAT } from '@/utils/constants'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export interface Conversation {
  messages: any[]
  currentUserId: string
  recipientUserId: string
  _id: string
}

const MessageItem = ({ conversation }: { conversation: Conversation }) => {
  const { connectedUsers } = useConnectedUserContext()

  const searchParams = useSearchParams()

  const { replace } = useRouter()
  const pathname = usePathname()

  const dispatch = useMessagesDispatchContext()

  const {
    messages,
    currentUserId,
    recipientUserId,
    _id: conversationId,
  } = conversation
  const { data: recipient } = useGetUser(recipientUserId)

  const handleSelectChat = (id: string) => {
    dispatch({ type: CURRENT_CHAT, payload: id })
    const params = new URLSearchParams(searchParams)
    params.set('recipient', recipient?.data.username)
    params.set('id', conversationId)
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <motion.div
      onClick={() => handleSelectChat(conversationId)}
      initial={{ opacity: 0, x: -300 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      className='grid grid-cols-[50px_150px_50px] px-1 min-[375px]:grid-cols-[50px_205px_40px] min-[425px]:grid-cols-[50px_255px_50px] md:grid-cols-[50px_150px_52px] lg:grid-cols-[50px_250px_50px] gap-4 xl:grid-cols-[50px_240px_50px] *:text-gray-200 cursor-pointer hover:bg-slate-700 py-4 rounded-md border border-white border-opacity-50 shadow-md'
    >
      <div className='relative'>
        <Image
          src='https://i.pravatar.cc/300'
          width={300}
          height={300}
          className='size-12 rounded-full'
          alt='avatar'
        />
        {/* shows if user is online */}
        {connectedUsers.map((user) => user.id).includes(recipientUserId) ? (
          <div className='rounded-full bg-green-500 size-3 absolute top-10 right-0'></div>
        ) : (
          <div className='rounded-full bg-gray-500 size-3 absolute top-10 right-0'></div>
        )}
      </div>
      <div className='text-xs'>
        <p className='font-bold'>{recipient?.data.username}</p>
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
