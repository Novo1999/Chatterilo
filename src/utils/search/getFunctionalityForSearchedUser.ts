import { MouseEvent } from 'react'
import toast from 'react-hot-toast'

const getFunctionalityForSearchedUserButton = (
  e: MouseEvent<HTMLButtonElement, MouseEvent>,
  conditions: boolean[],
  userId: string,
  functions: Function[]
) => {
  const [handleCancelFriend, acceptFriendRequest, handleAddFriend] = functions
  const [isFriend, userSentFriendRequest, userReceivedFriendRequest] =
    conditions

  if (userSentFriendRequest) {
    handleCancelFriend(e, userId)
  } else if (userReceivedFriendRequest) {
    acceptFriendRequest(userId)
  } else if (!isFriend) {
    handleAddFriend(e, userId)
  } else {
    toast.error('ERROR')
  }
}

export default getFunctionalityForSearchedUserButton
