import useAuthContext from '@/hooks/contextHooks/useAuthContext'
import useConnectedUserContext from '@/hooks/contextHooks/useConnectedUserContext'
import { socket } from '@/lib/socket'
import customFetch from '@/utils/misc/customFetch'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const useHeader = () => {
  const router = useRouter()
  const {
    user: { username, friendRequests, _id, friends } = {},
    isLoading,
    isError,
  } = useAuthContext()

  const [inputValue, setInputValue] = useState('')
  const [isFriendRequestListOpen, setIsFriendRequestListOpen] = useState(false)
  const [isFriendsListOpen, setIsFriendsListOpen] = useState(false)
  const { setConnectedUsers } = useConnectedUserContext()

  // opens the friend list
  const handleFriendListClick = () => {
    setIsFriendRequestListOpen(false)
    setIsFriendsListOpen(!isFriendsListOpen)
  }

  // opens the friend request list
  const handleFriendRequestListClick = () => {
    setIsFriendsListOpen(false)
    setIsFriendRequestListOpen(!isFriendRequestListOpen)
  }

  // controls the friend list and request list menu
  const handleCloseMenu = () => {
    if (isFriendsListOpen) {
      setIsFriendsListOpen(false)
    }
    if (isFriendRequestListOpen) {
      setIsFriendRequestListOpen(false)
    }
  }

  // logs out user
  const handleLogOut = async () => {
    await customFetch.get('/auth/logout')
    router.push('/login')
  }

  // change connected users
  useEffect(() => {
    if (username !== '') {
      socket.connect()
      socket.emit('connected-user', {
        id: _id,
        name: username,
      })
    }
    socket.on('users', (data) => {
      setConnectedUsers(data)
    })

    // when user closes tab emit this event to disconnect from the socket
    const handleBeforeUnload = () =>
      socket.emit('connected-user-dc', {
        id: _id,
        name: username,
      })

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      socket.disconnect()
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [username, _id])

  return {
    handleFriendListClick,
    handleFriendRequestListClick,
    isLoading,
    isError,
    username,
    friends,
    friendRequests,
    handleCloseMenu,
    handleLogOut,
    inputValue,
    setInputValue,
    isFriendsListOpen,
    isFriendRequestListOpen,
  }
}
export default useHeader
