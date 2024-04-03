import { Plus } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Input } from './ui/input'
import { Label } from './ui/label'
import ShimmerBtn from './ui/shimmer-btn'
import UserNameSparkle from './UserNameSparkle'

const Header = () => {
  return (
    <>
      <div className='flex-between'>
        <Avatar>
          <AvatarImage src='https://github.com/shadcn.png' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className='w-full ml-4 bg-[#23262e] flex flex-col items-center justify-center overflow-hidden rounded-md'>
          {/* user name */}
          <h1 className='md:text-7xl text-md lg:text-9xl font-bold text-center text-white relative z-20'>
            Novodip Mondal
          </h1>
          {/* sparkle */}
          <UserNameSparkle />
        </div>
      </div>
      <div className='flex *:text-white  flex-col mt-4'>
        {/* label */}
        <Label className='mb-4' htmlFor='firstname'>
          Search Users
        </Label>
        {/* search input */}
        <div className='flex gap-2'>
          <Input
            className='bg-black text-white w-[240px] min-[375px]:w-[290px] min-[425px]:w-[340px]'
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
    </>
  )
}
export default Header
