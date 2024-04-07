import { createContext } from 'react'

interface User {
  user: {
    friends: any[]
    conversations: any[]
    _id: string
    email: string
    username: string
    createdAt: string
    __v: number
    friendRequests: string[]
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
    friendRequests: [],
  },
}

export const AuthContext = createContext<User>(defaultUser)
