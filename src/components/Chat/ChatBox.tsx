'use client'
import {
  useMessagesContext,
  useMessagesDispatchContext,
} from '@/hooks/contextHooks/useMessagesContext'
import useChatBox from '@/hooks/useChatBox'
import { socket } from '@/lib/socket'
import { PUSH_NEW_MESSAGE } from '@/utils/constants'
import { Loader } from 'lucide-react'
import { useEffect } from 'react'
import Conversation from '../Message/Conversation'
import MessageError from '../Message/Message-Error'
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

  const recipientName = recipient?.data?.username

  const { currentConversation } = useMessagesContext()

  console.log(currentConversation)

  const dispatch = useMessagesDispatchContext()

  useEffect(() => {
    socket.on('new_message', (message) => {
      dispatch({ type: PUSH_NEW_MESSAGE, payload: message })
    })
  }, [])

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

        <Conversation messages={currentConversation.conversationMessages} />

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
      }  md:flex flex-col justify-between ml-2 rounded-b-md shadow-slate-400 p-4 shadow-sm`}
    >
      {content}
    </div>
  )
}
export default Chatbox
