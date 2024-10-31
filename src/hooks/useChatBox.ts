import { useConversationContext } from '@/context'
import { socket } from '@/lib/socket'
import getReceiverDetails from '@/utils/chat/getReceiverDetails'
import { useQueryClient } from '@tanstack/react-query'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import useGetConversation from './api/useGetConversation'
import useAuthContext from './contextHooks/useAuthContext'
import useConnectedUserContext from './contextHooks/useConnectedUserContext'

const useChatBox = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const conversationId = searchParams.get('conversation')
  const queryClient = useQueryClient()
  const {
    data: conversation,
    isLoading,
    isError,
  } = useGetConversation(conversationId as string)
  const { user } = useAuthContext()
  const userId = user?._id
  const receiverDetails = getReceiverDetails(
    conversation?.data?.participant1,
    userId,
    conversation?.data?.participant2
  )
  const { connectedUsers } = useConnectedUserContext()
  const matchedConnectedUser = connectedUsers.find(
    (cUser) => cUser.id === receiverDetails?.receiverId
  )
  let timeoutId: NodeJS.Timeout

  const { setConversations, conversations } = useConversationContext()!
  console.log("🚀 ~ useChatBox ~ conversations:", conversations)

  useEffect(() => {
    if(isLoading && isError) return
    if(conversation) setConversations(prev => ([...prev, conversation]))
  }, [isLoading, isError, conversation])


  const [typingUserId, setTypingUserId] = useState('')

  const emitUserTyping = () => {
    clearTimeout(timeoutId)

    socket.emit('user_typing', {
      matchedConnectedUser,
      senderId: userId,
    })

    timeoutId = setTimeout(() => {
      socket.emit('user_not_typing', {
        matchedConnectedUser,
        senderId: userId,
      })
    }, 1500)
  }

  const emitSendMessage = (message: string) => {
    socket.emit("message-sent", {
      conversationId,
      sender: userId,
      receiver: receiverDetails?.receiverId
      , matchedConnectedUser,
      message
    })
  }

  useEffect(() => {
    socket.on("new-message", data => {
      console.log(data)
    })
  }, [])

  useEffect(() => {
    socket.on('typing', (data) => {
      setTypingUserId(data.senderId)
    })

    socket.on('not_typing', () => {
      setTypingUserId('')
    })
  }, [])

  return {
    emitUserTyping,
    typingUserId,
    user,
    conversation,
    conversationId,
    isLoading,
    isError,
    pathname,
    userId,
    receiverDetails,
    emitSendMessage
  }
}
export default useChatBox
