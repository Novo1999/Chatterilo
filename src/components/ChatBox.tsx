'use client'
import useGetConversation from '@/hooks/api/useGetConversation'
import useGetUser from '@/hooks/api/useGetUser'
import useAuthContext from '@/hooks/contextHooks/useAuthContext'
import useConnectedUserContext from '@/hooks/contextHooks/useConnectedUserContext'
import { useMessagesContext } from '@/hooks/contextHooks/useMessagesContext'
import { socket } from '@/lib/socket'
import {
  ArrowLeft,
  Info,
  Loader,
  Paperclip,
  PhoneCall,
  Send,
  VideoIcon,
} from 'lucide-react'
import Image from 'next/image'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import MessageError from './Message/Message-Error'
import MessagesContainer from './Message/MessagesContainer'
import { Input } from './ui/input'

type MessageInput = {
  message: string
}

const Chatbox = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const recipientName = searchParams.get('recipient')
  const conversationIdFromParam = searchParams.get('id')
  const { register, handleSubmit, resetField } = useForm<MessageInput>()
  const { currentConversationId } = useMessagesContext()
  const { data, isLoading, isError } = useGetConversation(
    conversationIdFromParam ?? currentConversationId
  )
  const { user } = useAuthContext()
  const [typerId, setTyperId] = useState('')
  const hasNoConversationId = !conversationIdFromParam && !currentConversationId
  const { connectedUsers } = useConnectedUserContext()
  const { data: recipient } = useGetUser(data?.recipientUserId)

  console.log(
    '🚀 ~ Chatbox ~ conversationIdFromParam:',
    conversationIdFromParam
  )

  // send message function
  const sendMessage = ({
    message,
    recipientUserId,
    senderId,
    conversationId,
  }: {
    message: string
    recipientUserId: string
    conversationId: string
    senderId: string
  }) => {
    const matchedConnectedUser = connectedUsers.find(
      (user) => user.id === recipientUserId
    )

    socket.emit('message', {
      matchedConnectedUser,
      recipientUserId,
      message,
      senderId,
      conversationId,
    })
  }

  // send message form submit
  const onSubmit: SubmitHandler<MessageInput> = (data) => {
    sendMessage({
      senderId: user._id,
      conversationId: conversationIdFromParam ?? currentConversationId,
      message: data.message,
      recipientUserId: recipient?.data._id,
    })
    resetField('message')
  }

  // send event of user typing
  let timeOutId: NodeJS.Timeout
  const emitUserTyping = () => {
    clearTimeout(timeOutId)
    const recipientUserId = recipient?.data._id
    const matchedConnectedUser = connectedUsers.find(
      (user) => user.id === recipientUserId
    )

    socket.emit('user_typing', {
      matchedConnectedUser,
      senderId: user._id,
      recipientUserId: recipient?.data._id,
      conversationId: conversationIdFromParam ?? currentConversationId,
    })

    timeOutId = setTimeout(() => {
      socket.emit('user_not_typing', {
        matchedConnectedUser,
        senderId: user._id,
        recipientUserId: recipient?.data._id,
        conversationId: conversationIdFromParam ?? currentConversationId,
      })
    }, 1500)
  }

  useEffect(() => {
    socket.connect()
    socket.on('new_message', (data) => {
      console.log('🚀 ~ socket.on ~ new_message:', data)
    })

    socket.on('typing', (data) => {
      console.log('🚀 ~ socket.on ~ typing:', data)
      setTyperId(data.senderId)
    })

    socket.on('not_typing', (data) => {
      console.log('🚀 ~ socket.on ~ not_typing:', data)
      setTyperId('')
    })
  }, [])

  // content
  let content = null

  if (!isLoading && isError) {
    content = <MessageError />
  }

  if (isLoading && !isError) {
    content = (
      <div className='flex-center h-[90vh] text-white'>
        <Loader className='animate-spin' />
      </div>
    )
  }

  if (!isLoading && !isError && !data?._id) {
    content = (
      <div className='h-[90vh] text-xl flex-center text-white'>NO DATA</div>
    )
  }

  if (hasNoConversationId) {
    content = (
      <div className='h-[90vh] text-white'>
        Start messaging by selecting from the left
      </div>
    )
  }

  if (!isLoading && !isError && data?._id) {
    content = (
      <>
        <nav className='flex-between text-gray-200 text-xs'>
          {/* nav left */}
          <div className='flex gap-2 items-center'>
            <ArrowLeft className='block md:hidden' />
            <Image
              width={300}
              height={300}
              alt='avatar'
              className='size-12 rounded-full'
              src='https://i.pravatar.cc/300'
            />
            <div className='flex flex-col justify-center relative'>
              <h1 className='font-bold whitespace-break-spaces'>
                {recipientName}
              </h1>
              {/* online status */}
              <div className='flex gap-2 items-center'>
                {connectedUsers
                  .map((user) => user.id)
                  .includes(recipient?.data?._id) ? (
                  <div className='rounded-full bg-green-500 size-3'></div>
                ) : (
                  <div className='rounded-full bg-gray-500 size-3'></div>
                )}
                {connectedUsers
                  .map((user) => user.id)
                  .includes(recipient?.data?._id) ? (
                  <p className='font-thin relative'>Online</p>
                ) : (
                  <p className='font-thin relative'>Offline</p>
                )}
              </div>
            </div>
          </div>
          {/* nav right */}
          <div className='flex gap-3'>
            <div>
              <PhoneCall />
            </div>
            <div>
              <VideoIcon />
            </div>
            <div>
              <Info />
            </div>
          </div>
        </nav>
        {/* message content */}

        <MessagesContainer messages={data?.messages} />

        {typerId === recipient?.data._id && (
          <p className='text-white text-xs'>typing...</p>
        )}
        <p className='text-white text-xs'>typing...</p>

        {/* bottom input and button */}
        <div className='flex items-center gap-2'>
          <div className='text-white'>
            <Paperclip />{' '}
          </div>
          <div className='flex-grow relative'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                gradient='teal'
                className='bg-slate-700 text-white w-full'
                placeholder='Write your message...'
                type='text'
                onKeyDown={emitUserTyping}
                {...register('message', { required: true })}
              />
              <button className='text-white absolute right-4 bottom-2'>
                <Send />
              </button>
            </form>
          </div>
        </div>
      </>
    )
  }

  return (
    <div
      className={`w-80 min-[375px]:w-96 min-[425px]:w-[35rem] ${
        pathname.startsWith('/messages') ? 'flex' : 'hidden'
      } sm:w-[25rem] lg:w-[37rem] md:w-[28rem] xl:w-full md:flex flex-col justify-between ml-2 rounded-md shadow-slate-400 p-4 shadow-sm`}
    >
      {content}
    </div>
  )
}
export default Chatbox
