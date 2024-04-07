import { socket } from '@/lib/socket'
import { useEffect, useState } from 'react'

const useSocket = () => {
  const [isConnected, setIsConnected] = useState(socket.connected)

  console.log(isConnected)
  useEffect(() => {
    function onConnect() {
      setIsConnected(true)
    }

    function onDisconnect() {
      setIsConnected(false)
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }
  }, [])

  return { isConnected }
}
export default useSocket
