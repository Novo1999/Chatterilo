import { socket } from '@/lib/socket'
import getReceiverDetails from '@/utils/chat/getReceiverDetails'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import useGetConversation from './api/useGetConversation'
import useAuthContext from './contextHooks/useAuthContext'
import useConnectedUserContext from './contextHooks/useConnectedUserContext'

const useChatBox = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const conversationId = searchParams.get('conversation')
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

  const [typingUserId, setTypingUserId] = useState('')

  const emitUserTyping = () => {
    clearTimeout(timeoutId)

    socket.emit('user_typing', {
      matchedConnectedUser,
      senderId: receiverDetails?.receiverId,
    })

    timeoutId = setTimeout(() => {
      socket.emit('user_not_typing', {
        matchedConnectedUser,
        senderId: receiverDetails?.receiverId,
      })
    }, 1500)
  }

  useEffect(() => {
    socket.on('typing', (data) => {
      console.log('🚀 ~ socket.on ~ data:', data)
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
  }
}
export default useChatBox
