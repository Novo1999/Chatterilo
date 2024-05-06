interface IFriend {
  isOpen: boolean
  handleCloseMenu: () => void
}

interface IAuthInput {
  email: string
  password: string
}

interface IConversation {
  messages: any[]
  currentUserId: string
  recipientUserId: string
  _id: string
  recipientName?: string
}

interface IUser {
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

interface IConnectedUser {
  id: string
  name: string
  socketId: string
}

interface IConnectedUsersContext {
  connectedUsers: IConnectedUser[]
  setConnectedUsers: Dispatch<SetStateAction<IConnectedUser[]>>
}

interface IMessage {
  id: string
  content: string
  timestamp: string
  reaction?: string
  sender: string
}

interface IMessageState {
  currentConversation: {
    currentConversationId: string
    conversationMessages: IMessage[]
  }
}

interface IAction {
  type: string
  payload: any
}
