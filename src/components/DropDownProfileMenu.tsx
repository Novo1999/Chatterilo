import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ReactNode } from 'react'
import { CgProfile } from 'react-icons/cg'
import { FaUserFriends } from 'react-icons/fa'
import { GiThreeFriends } from 'react-icons/gi'

const DropDownProfileMenu = ({ children }: { children: ReactNode }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='cursor-pointer md:cursor-default'>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className='md:hidden block'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='flex gap-2'>
          <CgProfile />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem className='flex gap-2'>
          <FaUserFriends />
          Friend requests
        </DropdownMenuItem>
        <DropdownMenuItem className='flex gap-2'>
          <GiThreeFriends />
          Friends
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default DropDownProfileMenu
