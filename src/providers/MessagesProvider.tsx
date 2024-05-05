'use client'
import { MessagesContext, MessagesDispatchContext } from '@/context'
import { CURRENT_CHAT, PUSH_NEW_MESSAGE } from '@/utils/constants'
import { ReactNode, useReducer } from 'react'

export const initialState = {
  currentConversationId: '',
}

const reducer = (state: IMessageState, action: IAction): IMessageState => {
  switch (action.type) {
    case CURRENT_CHAT:
      return {
        ...state,
        currentConversationId: action.payload,
      }
    case PUSH_NEW_MESSAGE:
      return {
        ...state,
        currentConversation: {
          currentConversationId: state.currentConversationId,
          conversationMessages:
            state.currentConversation.conversationMessages.push(action.payload),
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

/*

{
  conversationId: "SOME_ID",
  conversationMsgs: [
    {
      id: random_id,
      message: MSG
    }
  ]
}

*/
