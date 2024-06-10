'use client'
import { MessagesContext, MessagesDispatchContext } from '@/context'
import { CURRENT_CHAT, PUSH_NEW_MESSAGE } from '@/utils/constants'
import { ReactNode, useReducer } from 'react'

export const initialState: IMessageState = {
  currentConversation: {
    currentConversationId: '',
    conversationMessages: [],
    currentUser: {} as IUser['user'],
    recipientUser: {} as IUser['user'],
  },
}

const reducer = (state: IMessageState, action: IAction): IMessageState => {
  switch (action.type) {
    case CURRENT_CHAT:
      return {
        ...state,
        currentConversation: {
          conversationMessages: [],
          currentConversationId: action.payload.conversationId,
          currentUser: action.payload.currentUser,
          recipientUser: action.payload.recipientUser,
        },
      }
    case PUSH_NEW_MESSAGE:
      return {
        ...state,
        currentConversation: {
          currentConversationId:
            state.currentConversation.currentConversationId,
          conversationMessages: [
            ...state.currentConversation.conversationMessages,
            action.payload,
          ],
        },
      }
    default:
      return state
  }
}

const MessagesProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <MessagesContext.Provider value={state}>
      <MessagesDispatchContext.Provider value={dispatch}>
        {children}
      </MessagesDispatchContext.Provider>
    </MessagesContext.Provider>
  )
}
export default MessagesProvider
