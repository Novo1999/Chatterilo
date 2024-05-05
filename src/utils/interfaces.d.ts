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
