import useGetUser from '@/hooks/api/useGetUser'
import useAuthContext from '@/hooks/contextHooks/useAuthContext'
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
        <ConversationItemChildren />
      </Link>
      <div
        // onClick={() => handleSelectChat(conversationId)}
        className='hidden sm:flex justify-between items-center px-2 gap-2 *:text-gray-100 cursor-pointer py-4 rounded-md border border-white border-opacity-50 shadow-md'
      >
        <ConversationItemChildren />
      </div>
    </motion.div>
  )
}
export default ConversationListItem
