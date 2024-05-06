import useGetConversation from '@/hooks/api/useGetConversation'
import useGetUser from '@/hooks/api/useGetUser'
import useAuthContext from '@/hooks/contextHooks/useAuthContext'
import useConnectedUserContext from '@/hooks/contextHooks/useConnectedUserContext'
import {
  useMessagesContext,
  useMessagesDispatchContext,
} from '@/hooks/contextHooks/useMessagesContext'
import { socket } from '@/lib/socket'
import { PUSH_NEW_MESSAGE } from '@/utils/constants'
import { useParams, usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const useChatBox = () => {
  const { userId: conversationIdFromParam } = useParams()

  const dispatch = useMessagesDispatchContext()

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const recipientName = searchParams.get('recipient')
  const conversationIdFromSearchParams = searchParams.get('id')

  const { register, handleSubmit, resetField } = useForm<{
    message: string
  }>()
  const {
    currentConversation: { currentConversationId },
  } = useMessagesContext()
  const { data, isLoading, isError } = useGetConversation(
    conversationIdFromSearchParams ||
      currentConversationId ||
      (conversationIdFromParam as string)
  )

  const { user } = useAuthContext()
  // set who is typing
  const [typerId, setTyperId] = useState('')
  // check if param has conversation
  const hasNoConversationId =
    !conversationIdFromSearchParams && !currentConversationId
  const { connectedUsers } = useConnectedUserContext()
  const { data: recipient } = useGetUser(data?.recipientUserId)

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

    dispatch({
      type: PUSH_NEW_MESSAGE,
      payload: { from: user._id, message: message },
    })

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
      conversationId: conversationIdFromSearchParams ?? currentConversationId,
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
      conversationId: conversationIdFromSearchParams ?? currentConversationId,
    })

    timeOutId = setTimeout(() => {
      socket.emit('user_not_typing', {
        matchedConnectedUser,
        senderId: user._id,
        recipientUserId: recipient?.data._id,
        conversationId: conversationIdFromSearchParams ?? currentConversationId,
      })
    }, 1500)
  }

  useEffect(() => {
    socket.connect()

    socket.on('typing', (data) => {
      setTyperId(data.senderId)
    })

    socket.on('not_typing', (data) => {
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
