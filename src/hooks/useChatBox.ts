import useGetConversation from '@/hooks/api/useGetConversation'
import useGetUser from '@/hooks/api/useGetUser'
import useAuthContext from '@/hooks/contextHooks/useAuthContext'
import useConnectedUserContext from '@/hooks/contextHooks/useConnectedUserContext'
import { useMessagesContext } from '@/hooks/contextHooks/useMessagesContext'
import { socket } from '@/lib/socket'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const useChatBox = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const recipientName = searchParams.get('recipient')
  const conversationIdFromParam = searchParams.get('id')
  const { register, handleSubmit, resetField } = useForm<{
    message: string
  }>()
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
  const onSubmit: SubmitHandler<{
    message: string
  }> = (data) => {
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

  return {
    isLoading,
    isError,
    data,
    hasNoConversationId,
    recipientName,
    connectedUsers,
    recipient,
    typerId,
    handleSubmit,
    onSubmit,
    register,
    emitUserTyping,
    pathname,
  }
}
export default useChatBox
