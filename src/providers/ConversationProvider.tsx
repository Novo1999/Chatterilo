'use client'
import { ConversationContext } from '@/context'
import { ReactNode, useState } from 'react'

const ConversationProvider = ({ children }: { children: ReactNode }) => {
    const [conversations, setConversations] = useState<IConversationObj[] | []>([])
    return (
        <ConversationContext.Provider
            value={{ conversations, setConversations }}
        >
            {children}
        </ConversationContext.Provider>
    )
}
export default ConversationProvider
