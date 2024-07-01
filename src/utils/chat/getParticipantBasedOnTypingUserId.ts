const getParticipantBasedOnTypingUserId = (
  conversation: IConversation,
  typingUserId: string
) => {
  if (conversation?.participant2?._id === typingUserId) {
    return conversation?.participant2?._id
  } else {
    return conversation?.participant1?._id
  }
}
export default getParticipantBasedOnTypingUserId
