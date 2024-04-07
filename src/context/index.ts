import { createContext } from 'react'

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

export const AuthContext = createContext<User>(defaultUser)
