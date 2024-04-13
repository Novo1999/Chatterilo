import { MessagesContext, MessagesDispatchContext } from '@/context'
import { useContext } from 'react'

const useMessagesContext = () => {
  const context = useContext(MessagesContext)
  if (!context) {
    throw new Error(
      'useMessagesContext must be used within an MessagesProvider'
    )
  }
  return context
}

const useMessagesDispatchContext = () => {
  const context = useContext(MessagesDispatchContext)
  if (!context) {
    throw new Error(
      'useMessagesDispatchContext must be used within an MessagesProvider'
    )
  }
  return context
}

export { useMessagesContext, useMessagesDispatchContext }
