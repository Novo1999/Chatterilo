'use client'

import useChatBox from '@/hooks/useChatBox'
import getParticipantBasedOnTypingUserId from '@/utils/chat/getParticipantBasedOnTypingUserId'
import getReceiverDetails from '@/utils/chat/getReceiverDetails'
import { motion } from 'framer-motion'
import { Loader, LucideMessageSquareDashed } from 'lucide-react'
import MessageError from '../Message/Message-Error'
import ChatInput from './ChatInput'
import ChatNav from './ChatNav'

const Chatbox = () => {
  const { userId, conversation, conversationId, isLoading, isError, pathname } =
    useChatBox()
  const { typingUserId } = useChatBox()

  const hasNoMessage = conversation?.data?.messages?.length === 0

  // content
  let content = null

  if (!conversationId) {
    return <p>Nothing</p>
  }

  const receiverDetails =
    !isLoading && !isError
      ? getReceiverDetails(
          conversation?.data?.participant1,
          userId,
          conversation?.data?.participant2
        )
      : null

  if (!isLoading && isError) {
    content = <MessageError />
  }

  if (isLoading && !isError) {
    content = (
      <div className='flex-center h-full text-white'>
        <Loader className='animate-spin' />
      </div>
    )
  }

  if (!isLoading && !isError && !conversation?.data?._id) {
    content = (
      <div className='text-xl flex-center text-white'>NO CONVERSATION</div>
    )
  }

  const doesTypingUserIdMatchesConversationParticipant =
    typingUserId ===
    getParticipantBasedOnTypingUserId(
      conversation?.data,
      receiverDetails as IReceiverDetails
    )

  // no message yet
  if (!isLoading && !isError && conversation?.data?._id && hasNoMessage) {
    content = (
      <>
        <motion.section
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className='flex justify-center items-center mt-12'
        >
          <div className='flex flex-col items-center justify-center bg-[#2E4756] rounded-full size-96 p-10'>
            <div className='text-white p-4'>Start Messaging Now</div>
            <div>
              <LucideMessageSquareDashed className='text-5xl text-white size-36' />
            </div>
          </div>
        </motion.section>

        {doesTypingUserIdMatchesConversationParticipant && (
          <p className='text-white text-xs  ml-12 relative bottom-1'>
            typing...
          </p>
        )}
        <ChatInput />
      </>
    )
  }

  // main content
  if (!isLoading && !isError && conversation?.data?._id && !hasNoMessage) {
    content = (
      <>
        <ChatNav recipientName={receiverDetails?.userName as string} />

        {/* <Conversation messages={currentConversation.conversationMessages} /> */}

        {doesTypingUserIdMatchesConversationParticipant && (
          <p className='text-white text-xs  ml-12 relative bottom-1'>
            typing...
          </p>
        )}

        <p className='text-white text-xs  ml-12 relative bottom-1'>typing...</p>
        {/* bottom input and button */}
        <ChatInput />
      </>
    )
  }

  return (
    <div
      className={`w-full bg-[#16262E] ${
        pathname.startsWith('/conversation') ? 'flex' : 'hidden'
      }  md:flex flex-col justify-between ${
        !userId ? 'ml-2' : ''
      } rounded-b-md shadow-slate-400 py-4 shadow-sm`}
    >
      {content}
    </div>
  )
}
export default Chatbox
