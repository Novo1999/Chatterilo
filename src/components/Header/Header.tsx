'use client'
import useHeader from '@/hooks/useHeader'
import { Loader2, LogOut } from 'lucide-react'
import dynamic from 'next/dynamic'
import { FaUserFriends } from 'react-icons/fa'
import { GiThreeFriends } from 'react-icons/gi'
import { RxCross1 } from 'react-icons/rx'
import DropDownProfileMenu from '../DropDownProfileMenu'
import SearchList from '../SearchList'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Input } from '../ui/input'
import ShimmerBtn from '../ui/shimmer-btn'
import UserNameSparkle from '../UserNameSparkle'

// causes hydration error so make these a non ssr
const NoSSRConnectionNotifier = dynamic(() => import('./ConnectionNotifier'), {
  ssr: false,
})
const NoSSRFriendRequests = dynamic(() => import('../Friends/FriendRequests'), {
  ssr: false,
})
const NoSSRFriendList = dynamic(() => import('../Friends/FriendList'), {
  ssr: false,
})

const Header = () => {
  const {
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
  } = useHeader()

  return (
    <section className='bg-[#16262E] p-2 shadow-lg rounded-t-md'>
      <div className='h-6'>
        <NoSSRConnectionNotifier />
      </div>
      <div className='flex-between justify-center pt-4'>
        <div className='block md:flex'>
          <DropDownProfileMenu
            handleFriendListClick={handleFriendListClick}
            handleFriendRequestListClick={handleFriendRequestListClick}
          >
            <Avatar>
              <AvatarImage src='https://github.com/shadcn.png' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropDownProfileMenu>
          <div className='ml-4 hidden md:flex flex-col items-center justify-center overflow-hidden rounded-md'>
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
                className='relative friends-btn'
                onClick={handleFriendListClick}
              >
                <FaUserFriends />
              </button>

              <NoSSRFriendList
                handleCloseMenu={handleCloseMenu}
                isOpen={isFriendsListOpen}
              />
            </div>
            <div className='relative flex items-center gap-2'>
              {friendRequests?.received.length! > 0 && (
                <div className='absolute rounded-full size-4 flex justify-center items-center top-4 right-7 z-50 text-xs bg-cyan-500'>
                  {friendRequests?.received.length}
                </div>
              )}
              <button
                className='relative friend-requests-btn'
                onClick={handleFriendRequestListClick}
              >
                <GiThreeFriends />
              </button>
              <NoSSRFriendRequests
                handleCloseMenu={handleCloseMenu}
                isOpen={isFriendRequestListOpen}
              />
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
              className='bg-[#2E4756] text-white w-[200px] min-[375px]:w-[210px] min-[425px]:w-[230px]'
              placeholder='Search...'
              type='text'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <div
              onClick={() => setInputValue('')}
              className='flex-between gap-2'
            >
              <ShimmerBtn open={inputValue.length > 0}>
                <RxCross1 className='font-bold text-xl text-white' />
              </ShimmerBtn>
            </div>
          </div>
          <SearchList inputValue={inputValue} isOpen={inputValue.length > 0} />
        </div>
      </div>
    </section>
  )
}
export default Header
