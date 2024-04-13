import { ConnectedUserContext } from '@/context'
import { useContext } from 'react'

const useConnectedUserContext = () => {
  const context = useContext(ConnectedUserContext)
  if (!context) {
    throw new Error(
      'useConnectedUserContext must be used within an ConnectedUserProvider'
    )
  }
  return context
}

export default useConnectedUserContext
