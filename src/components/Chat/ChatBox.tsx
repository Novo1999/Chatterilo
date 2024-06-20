'use client'

import { Loader } from 'lucide-react'
import MessageError from '../Message/Message-Error'
import ChatInput from './ChatInput'
import ChatNav from './ChatNav'
import Conversation from './Conversation'

const Chatbox = () => {
  // content
  let content = null

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

  if (!isLoading && !isError && !conversation?._id) {
    content = (
      <div className='text-xl flex-center text-white'>NO CONVERSATION</div>
    )
  }

  if (hasNoConversationId && !userId) {
    content = (
      <div className='text-white p-4'>
        Start messaging by selecting from the left
      </div>
    )
  }

  // main content
  if (!isLoading && !isError && conversation?._id) {
    content = (
      <>
        <ChatNav recipientName={recipientName as string} />

        <Conversation messages={currentConversation.conversationMessages} />

        {typerId === currentConversation?.recipientUser?._id && (
          <p className='text-white text-xs  ml-12 relative bottom-1'>
            typing...
          </p>
        )}

        {/* bottom input and button */}
        <ChatInput />
      </>
    )
  }

  return (
    <div
      className={`w-full bg-[#16262E] ${
        pathname.startsWith('/messages') ? 'flex' : 'hidden'
      }  md:flex flex-col justify-between ${
        !userId ? 'ml-2' : ''
      } rounded-b-md shadow-slate-400 py-4 shadow-sm`}
    >
      {content}
    </div>
  )
}
export default Chatbox
