import useAuthContext from '@/hooks/contextHooks/useAuthContext'
import getReceiverDetails from '@/utils/chat/getReceiverDetails'
import { motion } from 'framer-motion'
import ConversationItemChildren from './ConversationItemChildren'

const ConversationListItem = ({
  conversation,
}: {
  conversation: IConversation
}) => {
  const { user: { username, friendRequests, _id: userId, friends } = {} } =
    useAuthContext()
  const { participant1, participant2, _id, lastMessage, messages } =
    conversation
  const receiverDetails = getReceiverDetails(
    participant1,
    userId!,
    participant2
  )

  if (!receiverDetails) {
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
        User not found
      </motion.div>
    )
  } else
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
        <ConversationItemChildren
          receiverDetails={receiverDetails}
          conversation={conversation}
          deviceType='mobile'
        />
        <ConversationItemChildren
          receiverDetails={receiverDetails}
          conversation={conversation}
          deviceType='not_mobile'
        />
      </motion.div>
    )
}
export default ConversationListItem
