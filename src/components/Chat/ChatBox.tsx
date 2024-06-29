'use client'

import useGetConversation from '@/hooks/api/useGetConversation'
import useAuthContext from '@/hooks/contextHooks/useAuthContext'
import getReceiverDetails from '@/utils/chat/getReceiverDetails'
import { Loader } from 'lucide-react'
import { usePathname, useSearchParams } from 'next/navigation'
import MessageError from '../Message/Message-Error'
import ChatInput from './ChatInput'
import ChatNav from './ChatNav'
import Conversation from './Conversation'

const Chatbox = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const conversationId = searchParams.get('conversation')
  const { user } = useAuthContext()
  const {
    data: conversation,
    isLoading,
    isError,
  } = useGetConversation(conversationId as string)
  console.log('🚀 ~ Chatbox ~ conversation:', conversation)
  const userId = user?._id
  console.log('🚀 ~ Chatbox ~ userId:', userId)
  const hasNoLastMessage = !conversation?.data?.lastMessage

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

  if (hasNoLastMessage) {
    content = (
      <div className='text-white p-4'>
        Start messaging by selecting from the left
      </div>
    )
  }

  // main content
  if (!isLoading && !isError && conversation?.data?._id) {
    content = (
      <>
        <ChatNav recipientName={receiverDetails?.userName as string} />

        {/* <Conversation messages={currentConversation.conversationMessages} /> */}

        {/* {typerId === currentConversation?.recipientUser?._id && (
          <p className='text-white text-xs  ml-12 relative bottom-1'>
            typing...
          </p>
        )} */}

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
