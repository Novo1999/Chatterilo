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
  participant1: IUser['user']
  participant2: IUser['user']
  _id: string
  lastMessage?: string
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
    currentUser?: IUser['user']
    recipientUser?: IUser['user']
  }
}

interface IAction {
  type: string
  payload: any
}

interface MessageProp {
  position: string
  message: IMessage
}

interface ISendMessage {
  message: string
  recipientUserId: string
  conversationId: string
  senderId: string
}

interface IConversationObj {
  recipientId: string
  conversationId: string
}

interface ISaveMessage {
  conversationId: string
  messageObj: IMessage
}
