import { useConversationContext } from '@/context'
import useAuthContext from '@/hooks/contextHooks/useAuthContext'
import { useEffect, useRef } from 'react'
import Message from '../Message/Message'

const Conversation = ({ messages }: { messages: IMessage[] }) => {
  const { user } = useAuthContext()
  const chatBoxRef = useRef<HTMLElement>(null)
  let content = null

  const { conversations } = useConversationContext()!

  useEffect(() => {
    if (chatBoxRef.current) chatBoxRef.current.scroll(0, chatBoxRef.current.scrollHeight)
  }, [conversations])

  if (messages.length === 0) {
    content = (
      <div className='h-60'>
        <p>No Conversations</p>
      </div>
    )
  } else
    content = (
      <div className='space-y-4'>
        {messages.map((item, index) => {
          return (
            <Message
              key={index}
              position={item?.sender !== user?._id ? 'right' : 'left'}
              message={item}
            />
          )
        })}
      </div>
    )

  return (
    <section ref={chatBoxRef} className='text-gray-200 p-4 h-5/6 bg-[#2E4756] text-sm space-y-4 mt-4 message-container mb-3 overflow-scroll'>
      {content}
    </section>
  )
}
export default Conversation
