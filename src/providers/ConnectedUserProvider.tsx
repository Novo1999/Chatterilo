'use client'
import { ConnectedUserContext } from '@/context'
import { ReactNode, useState } from 'react'

const ConnectedUserProvider = ({ children }: { children: ReactNode }) => {
  const [connectedUsers, setConnectedUsers] = useState<IConnectedUser[]>([])
  return (
    <ConnectedUserContext.Provider
      value={{ connectedUsers, setConnectedUsers }}
    >
      {children}
    </ConnectedUserContext.Provider>
  )
}
export default ConnectedUserProvider
