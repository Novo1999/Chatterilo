let retryCount = 0

const getReceiverDetails = (
  participant1: IUser['user'],
  userId: string,
  participant2: IUser['user']
) => {
  if (!userId && retryCount <= 5) {
    retryCount++
    getReceiverDetails(participant1, userId, participant2)
  }
  if (userId && userId !== participant1._id) {
    return {
      receiverId: participant1._id,
      userName: participant1.username,
    }
  } else if (userId !== participant2._id) {
    return {
      receiverId: participant2._id,
      userName: participant2.username,
    }
  } else {
    return null
  }
}

export default getReceiverDetails
