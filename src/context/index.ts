import { createContext, Dispatch, useContext } from 'react'

const defaultUser: IUser = {
  user: {
    friends: [],
    conversations: [],
    _id: '',
    email: '',
    username: '',
    createdAt: '',
    __v: 0,
    friendRequests: {
      sent: [],
      received: [],
    },
  },
}

const defaultConnectedUsersContext: IConnectedUsersContext = {
  connectedUsers: [],
  setConnectedUsers: () => void 0,
}
export const AuthContext = createContext<IUser>(defaultUser)
export const ConnectedUserContext = createContext<IConnectedUsersContext>(
  defaultConnectedUsersContext
)
export const MessagesDispatchContext = createContext<Dispatch<IAction> | null>(
  null
)


export const ConversationContext = createContext<IConversationsContext| null>(null)


export const useConversationContext = () => {
  return useContext(ConversationContext)
}