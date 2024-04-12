'use client'
import useSearchUsers from '@/hooks/api/useSearchUsers'
import useAuthContext from '@/hooks/contextHooks/useAuthContext'
import useConnectedUserContext from '@/hooks/contextHooks/useConnectedUserContext'
import { socket } from '@/lib/socket'
import customFetch from '@/utils/customFetch'
import { useDebounce } from '@uidotdev/usehooks'
import { Loader2, LogOut, Plus } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { FaUserFriends } from 'react-icons/fa'
import { GiThreeFriends } from 'react-icons/gi'
import DropDownProfileMenu from '../DropDownProfileMenu'
import FriendList from '../Friends/FriendList'
import FriendRequests from '../Friends/FriendRequests'
import SearchList from '../SearchList'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import ShimmerBtn from '../ui/shimmer-btn'
import UserNameSparkle from '../UserNameSparkle'

// causes hydration error so make this a non ssr
const NoSSRConnectionNotifier = dynamic(() => import('./ConnectionNotifier'), {
  ssr: false,
})

const Header = () => {
  const router = useRouter()
  const {
    user: { username, friendRequests, _id, friends } = {},
    isLoading,
    isError,
  } = useAuthContext()

  const [inputValue, setInputValue] = useState('')
  const [isFriendRequestListOpen, setIsFriendRequestListOpen] = useState(false)
  const [isFriendsListOpen, setIsFriendsListOpen] = useState(false)
  const debouncedSearchTerm = useDebounce(inputValue, 300)
  const { data } = useSearchUsers(debouncedSearchTerm)
  const { setConnectedUsers } = useConnectedUserContext()
  const friendButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Element
      if (
        friendButtonRef.current &&
        !friendButtonRef.current.contains(target as Node) &&
        !target.classList.contains('friend-requests-btn') &&
        !target.classList.contains('friends-btn') &&
        !target.classList.contains('friend-content')
      ) {
        setIsFriendRequestListOpen(false)
        setIsFriendsListOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  const handleFriendListClick = () => {
    setIsFriendRequestListOpen(false)
    setIsFriendsListOpen(!isFriendsListOpen)
  }

  const handleFriendRequestListClick = () => {
    setIsFriendsListOpen(false)
    setIsFriendRequestListOpen(!isFriendRequestListOpen)
  }

  const handleLogOut = async () => {
    await customFetch.get('/auth/logout')
    router.push('/login')
  }

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

  return (
    <>
      <div className='h-6'>
        <NoSSRConnectionNotifier />
      </div>
      <div className='flex-between justify-center pt-4'>
        <div className='block md:flex'>
          <DropDownProfileMenu>
            <Avatar>
              <AvatarImage src='https://github.com/shadcn.png' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropDownProfileMenu>
          <div className='ml-4 hidden md:flex bg-[#23262e]  flex-col items-center justify-center overflow-hidden rounded-md'>
            <div className='md:text-xl text-md font-bold text-center text-white relative z-20'>
              {isLoading && !isError ? (
                <div className='animate-spin'>
                  <Loader2 />
                </div>
              ) : isError ? (
                <p className='text-red-500'>ERROR</p>
              ) : (
                username
              )}
            </div>
            <UserNameSparkle />
          </div>
          <div className='ml-4 gap-2 hidden md:flex *:text-white mt-2 *:text-3xl'>
            <div className='relative'>
              {friends?.length! > 0 && (
                <div className='absolute rounded-full size-4 flex justify-center items-center top-4 -right-1 z-50 text-xs bg-cyan-500'>
                  {friends?.length}
                </div>
              )}
              <button
                ref={friendButtonRef}
                className='relative friends-btn'
                onClick={handleFriendListClick}
              >
                <FaUserFriends />
                <div className='friend-content'>
                  <FriendList isOpen={isFriendsListOpen} />
                </div>
              </button>
            </div>
            <div className='relative flex items-center gap-2'>
              {friendRequests?.received.length! > 0 && (
                <div className='absolute rounded-full size-4 flex justify-center items-center top-4 right-7 z-50 text-xs bg-cyan-500'>
                  {friendRequests?.received.length}
                </div>
              )}
              <button
                ref={friendButtonRef}
                className='relative friend-requests-btn'
                onClick={handleFriendRequestListClick}
              >
                <GiThreeFriends />
                <div className='friend-content'>
                  <FriendRequests isOpen={isFriendRequestListOpen} />
                </div>
              </button>
              <button onClick={handleLogOut}>
                <LogOut />
              </button>
            </div>
          </div>
        </div>
        <div className='flex *:text-white items-center relative flex-col'>
          <div className='flex gap-2'>
            <Input
              gradient='blue'
              className='bg-black text-white w-[200px] min-[375px]:w-[210px] min-[425px]:w-[230px]'
              placeholder='Search...'
              type='text'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <div className='flex-between text-white gap-2'>
              <ShimmerBtn>
                <Plus />
              </ShimmerBtn>
            </div>
          </div>
          <SearchList searchData={data?.data} isOpen={data?.data?.length > 0} />
        </div>
      </div>
    </>
  )
}
export default Header
