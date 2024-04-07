'use client'
import useAuthContext from '@/hooks/contextHooks/useAuthContext'
import { Plus } from 'lucide-react'
import dynamic from 'next/dynamic'
import { FaUserFriends } from 'react-icons/fa'
import { GiThreeFriends } from 'react-icons/gi'
import DropDownProfileMenu from '../DropDownProfileMenu'
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
  const { user: { username, friendRequests } = {} } = useAuthContext()

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
            <h1 className='md:text-xl text-md font-bold text-center text-white relative z-20'>
              {username}
            </h1>
            {/* sparkle */}
            <UserNameSparkle />
          </div>
          {/* additional menus */}
          <div className='ml-4 gap-2 hidden md:flex *:text-white mt-2 *:text-3xl'>
            <FaUserFriends />
            <div className='relative'>
              <div className='absolute rounded-full size-4 flex justify-center items-center top-4 -right-1 text-xs bg-cyan-500'>
                {friendRequests?.length}
              </div>
              <GiThreeFriends />
            </div>
          </div>
        </div>
        <div className='flex *:text-white items-center flex-col'>
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
            />
            <div className='flex-between text-white gap-2'>
              <ShimmerBtn>
                <Plus />
              </ShimmerBtn>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Header
