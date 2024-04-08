'use client'
import { ConnectedUser, ConnectedUserContext } from '@/context'
import { ReactNode, useState } from 'react'

const ConnectedUserProvider = ({ children }: { children: ReactNode }) => {
  const [connectedUsers, setConnectedUsers] = useState<ConnectedUser[]>([])
  console.log(connectedUsers)
  return (
    <ConnectedUserContext.Provider
      value={{ connectedUsers, setConnectedUsers }}
    >
      {children}
    </ConnectedUserContext.Provider>
  )
}
export default ConnectedUserProvider
