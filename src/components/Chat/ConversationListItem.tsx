import useGetUser from '@/hooks/api/useGetUser'
import { useMessagesDispatchContext } from '@/hooks/contextHooks/useMessagesContext'
import { CURRENT_CHAT } from '@/utils/constants'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import ConversationItemChildren from '../Message/ConversationItemChildren'

const ConversationListItem = ({
  conversation,
}: {
  conversation: IConversation
}) => {
  console.log('🚀 ~ conversation:', conversation)
  const searchParams = useSearchParams()

  const { replace } = useRouter()
  const pathname = usePathname()

  const dispatch = useMessagesDispatchContext()

  const { messages, recipientUserId, _id: conversationId } = conversation
  console.log('🚀 ~ conversation:', conversation)
  const { data: recipient } = useGetUser(recipientUserId)
  console.log('🚀 ~ recipient:', recipient)

  const handleSelectChat = (id: string) => {
    // dispatch current chat with id as payload
    dispatch({ type: CURRENT_CHAT, payload: id })
    const params = new URLSearchParams(searchParams)
    // set recipient and conversationId as search params
    params.set('recipient', recipient?.data.username)
    params.set('id', conversationId)
    replace(`${pathname}?${params.toString()}`)
  }

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
        href={`messages/${conversationId}`}
      >
        <ConversationItemChildren conversation={conversation} />
      </Link>
      <div
        onClick={() => handleSelectChat(conversationId)}
        className='hidden sm:flex justify-between items-center px-2 gap-2 *:text-gray-100 cursor-pointer py-4 rounded-md border border-white border-opacity-50 shadow-md'
      >
        <ConversationItemChildren conversation={conversation} />
      </div>
    </motion.div>
  )
}
export default ConversationListItem
