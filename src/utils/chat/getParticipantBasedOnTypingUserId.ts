const getParticipantBasedOnTypingUserId = (
  conversation: IConversation,
  receiverDetails: IReceiverDetails
) => {
  const conversationParticipant1 = conversation?.participant1
  const conversationParticipant2 = conversation?.participant2
  if (conversationParticipant1?._id === receiverDetails?.receiverId) {
    return {
      participantId: conversationParticipant1?._id,
      participantUserName: conversationParticipant1?.username,
    }
  } else {
    return {
      participantId: conversationParticipant2?._id,
      participantUserName: conversationParticipant2?.username,
    }
  }
}
export default getParticipantBasedOnTypingUserId
