import { createContext, Dispatch } from 'react'

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
export const MessagesContext = createContext<IMessageState | null>(null)
export const MessagesDispatchContext = createContext<Dispatch<IAction> | null>(
  null
)
