import { createContext, Dispatch, SetStateAction } from 'react'

export interface User {
  user: {
    friends: any[]
    conversations: any[]
    _id: string
    email: string
    username: string
    createdAt: string
    __v: number
    friendRequests: {
      sent: string[]
      received: string[]
    }
  }
  isLoading?: boolean
  isError?: boolean
}

const defaultUser: User = {
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

export interface ConnectedUser {
  id: string
  name: string
  socketId: string
}

export interface ConnectedUsersContext {
  connectedUsers: ConnectedUser[]
  setConnectedUsers: Dispatch<SetStateAction<ConnectedUser[]>>
}

const defaultConnectedUsersContext: ConnectedUsersContext = {
  connectedUsers: [],
  setConnectedUsers: () => void 0,
}
export const AuthContext = createContext<User>(defaultUser)
export const ConnectedUserContext = createContext<ConnectedUsersContext>(
  defaultConnectedUsersContext
)
