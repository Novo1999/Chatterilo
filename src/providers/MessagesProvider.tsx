'use client'
import { MessagesContext, MessagesDispatchContext } from '@/context'
import { LOAD_MESSAGE_USERS_LIST } from '@/utils/constants'
import { ReactNode, useReducer } from 'react'

export interface State {
  messageUsersList: any[]
}

export interface Action {
  type: string
  payload: any
}

const initialState = {
  messageUsersList: [],
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case LOAD_MESSAGE_USERS_LIST:
      return {
        ...state,
        messageUsersList: [...state.messageUsersList, action.payload],
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
