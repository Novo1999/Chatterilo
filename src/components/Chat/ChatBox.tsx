'use client'
import useChatBox from '@/hooks/useChatBox'
import { Loader } from 'lucide-react'
import MessageError from '../Message/Message-Error'
import MessagesContainer from '../Message/MessagesContainer'
import ChatInput from './ChatInput'
import ChatNav from './ChatNav'

const Chatbox = () => {
  const {
    isLoading,
    isError,
    data,
    hasNoConversationId,
    recipient,
    typerId,
    pathname,
  } = useChatBox()

  console.log(recipient)

  const recipientName = recipient?.data?.username

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

  if (!isLoading && !isError && !data?._id) {
    content = <div className='text-xl flex-center text-white'>NO DATA</div>
  }

  if (hasNoConversationId) {
    content = (
      <div className='text-white'>
        Start messaging by selecting from the left
      </div>
    )
  }

  if (!isLoading && !isError && data?._id) {
    content = (
      <>
        <ChatNav recipientName={recipientName} />
        {/* message content */}

        <MessagesContainer messages={data?.messages} />

        {typerId === recipient?.data._id && (
          <p className='text-white text-xs'>typing...</p>
        )}

        {/* bottom input and button */}
        <ChatInput />
      </>
    )
  }

  return (
    <div
      className={`w-full bg-[#2F4858] ${
        pathname.startsWith('/messages') ? 'flex' : 'hidden'
      }  md:flex flex-col justify-between ml-2 rounded-md shadow-slate-400 p-4 shadow-sm`}
    >
      {content}
    </div>
  )
}
export default Chatbox
