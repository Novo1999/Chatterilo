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
import moment from 'moment'
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
  }: ISendMessage) => {
    const matchedConnectedUser = connectedUsers.find(
      (user) => user.id === recipientUserId
    )

    dispatch({
      type: PUSH_NEW_MESSAGE,
      payload: {
        sender: user._id,
        content: message,
        timestamp: moment().format('YYYY-MM-DD hh:mm A'),
      },
    })

    socket.emit('message', {
      matchedConnectedUser,
      recipientUserId,
      message,
      senderId,
      conversationId,
    })
  }

  // matched connected user
  let timeOutId: NodeJS.Timeout
  const recipientUserId = recipient?.data._id
  const matchedConnectedUser = connectedUsers.find(
    (user) => user.id === recipientUserId
  )

  const conversationId = conversationIdFromSearchParams ?? currentConversationId

  // send message form submit
  const onSubmit: SubmitHandler<{
    message: string
  }> = (data) => {
    sendMessage({
      senderId: user._id,
      conversationId: conversationId,
      message: data.message,
      recipientUserId: recipient?.data._id,
    })
    resetField('message')
    clearTimeout(timeOutId)
    // when user sends the message, he is not typing at that moment, so send this event
    socket.emit('user_not_typing', {
      matchedConnectedUser,
      senderId: user._id,
      recipientUserId: recipient?.data._id,
      conversationId: conversationId,
    })
  }

  // send event of user typing
  const emitUserTyping = () => {
    clearTimeout(timeOutId)

    socket.emit('user_typing', {
      matchedConnectedUser,
      senderId: user._id,
      recipientUserId: recipient?.data._id,
      conversationId: conversationId,
    })

    timeOutId = setTimeout(() => {
      socket.emit('user_not_typing', {
        matchedConnectedUser,
        senderId: user._id,
        recipientUserId: recipient?.data._id,
        conversationId: conversationId,
      })
    }, 1500)
  }

  useEffect(() => {
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
