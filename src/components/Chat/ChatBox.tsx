'use client'
import {
  useMessagesContext,
  useMessagesDispatchContext,
} from '@/hooks/contextHooks/useMessagesContext'
import useChatBox from '@/hooks/useChatBox'
import { socket } from '@/lib/socket'
import { PUSH_NEW_MESSAGE } from '@/utils/constants'
import { Loader } from 'lucide-react'
import { useParams } from 'next/navigation'
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

  const { userId } = useParams()

  const { currentConversation } = useMessagesContext()

  console.log(currentConversation)

  const dispatch = useMessagesDispatchContext()

  // push new message to the state when new message comes from the other client
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

  if (hasNoConversationId && !userId) {
    content = (
      <div className='text-white p-4'>
        Start messaging by selecting from the left
      </div>
    )
  }

  // main content
  if (!isLoading && !isError && data?._id) {
    content = (
      <>
        <ChatNav recipientName={recipientName} />

        <Conversation messages={currentConversation.conversationMessages} />

        {typerId === recipient?.data._id && (
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
