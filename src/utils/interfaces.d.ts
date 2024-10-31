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
  lastMessageTimeStamp?: string
}

interface IReceiverDetails {
  receiverId: string
  userName: string
}

interface IConversationItemChildren {
  deviceType: string
  receiverDetails: {
    receiverId: string
    userName: string
  }
  conversation: IConversation
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
  _id: string
  message: string
  timestamp: string
  reaction?: string
  sender: string
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
  _id: string,
  participant1: IUser
  participant2: IUser
  lastMessage: string
  lastMessageTimeStamp: Date
  messages: IMessage[]
}



interface ConversationContextType {
  conversations: IConversationObj[];
  setConversations: Dispatch<SetStateAction<IConversationObj[]>>;
}

interface ISaveMessage {
  conversationId: string
  messageObj: IMessage
}
