'use client'
import { ConnectedUser, ConnectedUserContext } from '@/context'
import { ReactNode, useState } from 'react'

const ConnectedUserProvider = ({ children }: { children: ReactNode }) => {
  const [connectedUsers, setConnectedUsers] = useState<ConnectedUser[]>([])
  return (
    <ConnectedUserContext.Provider
      value={{ connectedUsers, setConnectedUsers }}
    >
      {children}
    </ConnectedUserContext.Provider>
  )
}
export default ConnectedUserProvider
