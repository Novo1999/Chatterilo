'use client'
import { MessagesContext, MessagesDispatchContext } from '@/context'
import { CURRENT_CHAT } from '@/utils/constants'
import { ReactNode, useReducer } from 'react'

export interface State {
  currentConversationId: string
}

export interface Action {
  type: string
  payload: any
}

const initialState = {
  currentConversationId: '',
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case CURRENT_CHAT:
      return {
        ...state,
        currentConversationId: action.payload,
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
