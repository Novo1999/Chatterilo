import useGetUser from '@/hooks/api/useGetUser'
import { useMessagesDispatchContext } from '@/hooks/contextHooks/useMessagesContext'
import { CURRENT_CHAT } from '@/utils/constants'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import MessageItemChildren from './MessageItemChildren'

const MessageItem = ({ conversation }: { conversation: IConversation }) => {
  const searchParams = useSearchParams()

  const { replace } = useRouter()
  const pathname = usePathname()

  const dispatch = useMessagesDispatchContext()

  const { messages, recipientUserId, _id: conversationId } = conversation
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
      initial={{ opacity: 0, x: -300 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* takes to the message page when user is on mobile */}
      <Link
        className='flex sm:hidden justify-between items-center px-2 gap-2 bg-[#FFECD1] *:text-gray-800 cursor-pointer hover:bg-[#d5c5ae] py-4 rounded-md border border-white border-opacity-50 shadow-md'
        href={`messages/${conversationId}`}
      >
        <MessageItemChildren conversation={conversation} />
      </Link>
      <div
        onClick={() => handleSelectChat(conversationId)}
        className='hidden sm:flex justify-between items-center px-2 gap-2 bg-[#FFECD1] *:text-gray-800 cursor-pointer hover:bg-[#d5c5ae] py-4 rounded-md border border-white border-opacity-50 shadow-md'
      >
        <MessageItemChildren conversation={conversation} />
      </div>
    </motion.div>
  )
}
export default MessageItem
