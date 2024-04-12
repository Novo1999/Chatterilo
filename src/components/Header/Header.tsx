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
import { useEffect, useState } from 'react'
import { FaUserFriends } from 'react-icons/fa'
import { GiThreeFriends } from 'react-icons/gi'
import DropDownProfileMenu from '../DropDownProfileMenu'
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
  // this search term is debounced and this works specifically for tanstack query
  const debouncedSearchTerm = useDebounce(inputValue, 300)
  const { data } = useSearchUsers(debouncedSearchTerm)
  const { setConnectedUsers } = useConnectedUserContext()

  // socket effects
  useEffect(() => {
    if (username !== '') {
      // connect only if there is a user logged in
      socket.connect()

      socket.emit('connected-user', {
        id: _id,
        name: username,
      })
    }
    socket.on('users', (data) => {
      setConnectedUsers(data)
    })

    // this will emit the id so the connected users get updated as user closes the browser tab
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

  // log out the user
  const handleLogOut = async () => {
    await customFetch.get('/auth/logout')
    router.push('/login')
  }

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
            {/* user name */}

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
            {/* sparkle */}
            <UserNameSparkle />
          </div>
          {/* additional menus */}
          <div className='ml-4 gap-2 hidden md:flex *:text-white mt-2 *:text-3xl'>
            <div className='relative'>
              {friends?.length! > 0 && (
                <div className='absolute rounded-full size-4 flex justify-center items-center top-4 -right-1 z-50 text-xs bg-cyan-500'>
                  {friends?.length}
                </div>
              )}
              <button className='relative'>
                <FaUserFriends />
              </button>
            </div>
            <div className='relative flex items-center gap-2'>
              {/* friend requests */}
              {friendRequests?.received.length! > 0 && (
                <div className='absolute rounded-full size-4 flex justify-center items-center top-4 right-7 z-50 text-xs bg-cyan-500'>
                  {friendRequests?.received.length}
                </div>
              )}
              {/* friends */}
              <button className='relative'>
                <GiThreeFriends
                  onClick={() =>
                    setIsFriendRequestListOpen(!isFriendRequestListOpen)
                  }
                />
                <FriendRequests isOpen={isFriendRequestListOpen} />
              </button>
              {/* log out */}
              <button onClick={handleLogOut}>
                <LogOut />
              </button>
            </div>
          </div>
        </div>
        <div className='flex *:text-white items-center relative flex-col'>
          {/* label */}
          <Label className='mb-4 hidden' htmlFor='firstname'>
            Search Users
          </Label>
          {/* search input */}
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
