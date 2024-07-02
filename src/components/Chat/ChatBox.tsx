'use client'

import useGetConversationLength from '@/hooks/api/useGetConversationLength'
import useChatBox from '@/hooks/useChatBox'
import getParticipantBasedOnTypingUserId from '@/utils/chat/getParticipantBasedOnTypingUserId'
import getReceiverDetails from '@/utils/chat/getReceiverDetails'
import { WELCOME_MESSAGE } from '@/utils/misc/constants'
import { motion } from 'framer-motion'
import { Loader, LucideMessageSquareDashed } from 'lucide-react'
import MessageError from '../Message/Message-Error'
import LottiePlayer from '../misc/LottiePlayer'
import { TextGenerateEffect } from '../ui/text-effect'
import ChatInput from './ChatInput'
import ChatNav from './ChatNav'

const Chatbox = () => {
  const {
    userId,
    conversation,
    conversationId,
    isLoading,
    isError,
    pathname,
    receiverDetails,
  } = useChatBox()
  const { typingUserId } = useChatBox()

  const hasNoMessage = conversation?.data?.messages?.length === 0

  const {
    isLoading: isTotalConversationLoading,
    isError: isTotalConversationError,
    data,
  } = useGetConversationLength()

  // content
  let content = null

  if (
    !isTotalConversationError &&
    !isTotalConversationLoading &&
    data?.data?.conversationLength > 0 &&
    !conversationId
  ) {
    return (
      <div className='bg-[#21333e] w-full h-full flex justify-center items-center flex-col'>
        <LottiePlayer
          url='https://lottie.host/f53fca5b-a648-4eaa-8761-6a8cc3cbcd89/zDjLLwGtIj.json'
          className='size-48'
        />
        <TextGenerateEffect words={WELCOME_MESSAGE} />
      </div>
    )
  }

  // const receiverDetails =
  //   !isLoading && !isError
  //     ? getReceiverDetails(
  //         conversation?.data?.participant1,
  //         userId,
  //         conversation?.data?.participant2
  //       )
  //     : null

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

  const currentParticipantTyping = getParticipantBasedOnTypingUserId(
    conversation?.data,
    receiverDetails as IReceiverDetails
  )
  console.log(
    '🚀 ~ Chatbox ~ currentParticipantTyping:',
    currentParticipantTyping
  )

  const doesTypingUserIdMatchesConversationParticipant =
    typingUserId === currentParticipantTyping.participantId
  // no message yet
  if (!isLoading && !isError && conversation?.data?._id && hasNoMessage) {
    content = (
      <div className='flex flex-col justify-between gap-6 h-full'>
        <ChatNav recipientName={receiverDetails?.userName as string} />
        <motion.section
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className='flex justify-center items-center mt-12'
        >
          <div className='flex flex-col items-center justify-center bg-[#2E4756] rounded-full size-96 absolute'>
            <div className='text-white p-4'>Start Messaging Now</div>
            <div>
              <LucideMessageSquareDashed className='text-5xl text-white size-36' />
            </div>
          </div>
        </motion.section>

        {/* typing */}
        <div className='flex flex-col'>
          <div
            className={`flex justify-start ml-12 items-center ${
              doesTypingUserIdMatchesConversationParticipant
                ? 'visible'
                : 'invisible'
            }`}
          >
            <LottiePlayer
              className='text-white ml-12 relative size-12 left-0'
              url='https://lottie.host/000993b4-caf2-4485-a517-2bfddf7b425e/QCho9MI46G.json'
            />
            <p className='text-xs text-white'>
              {currentParticipantTyping?.participantUserName} is typing...
            </p>
          </div>
          <ChatInput />
        </div>
      </div>
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
