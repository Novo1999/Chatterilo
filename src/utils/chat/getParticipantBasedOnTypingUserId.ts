const getParticipantBasedOnTypingUserId = (
  conversation: IConversation,
  receiverDetails: IReceiverDetails
) => {
  if (conversation?.participant2?._id === receiverDetails?.receiverId) {
    return conversation?.participant1?._id
  } else {
    return conversation?.participant2?._id
  }
}
export default getParticipantBasedOnTypingUserId
