import TooltipContainer from '@/components/ui/TooltipContainer'
import { CheckCircle } from 'lucide-react'
import { FaCheckCircle } from 'react-icons/fa'
import { IoMdPersonAdd } from 'react-icons/io'
import { LiaUserFriendsSolid } from 'react-icons/lia'

const getEmojiForSearchedUser = (conditions: boolean[]) => {
  const [isFriend, userSentFriendRequest, userReceivedFriendRequest] =
    conditions

  if (userSentFriendRequest) {
    return (
      <TooltipContainer text='Cancel'>
        <div>
          <CheckCircle />
        </div>
      </TooltipContainer>
    )
  } else if (userReceivedFriendRequest) {
    return (
      <TooltipContainer text='Accept'>
        <div>
          <FaCheckCircle className='text-xl' />
        </div>
      </TooltipContainer>
    )
  } else if (!isFriend) {
    return (
      <TooltipContainer text='Send Request'>
        <div>
          <IoMdPersonAdd className='text-xl' />
        </div>
      </TooltipContainer>
    )
  } else {
    return (
      <TooltipContainer text='Already Friend'>
        <div>
          <LiaUserFriendsSolid className='text-xl' />
        </div>
      </TooltipContainer>
    )
  }
}

export default getEmojiForSearchedUser
