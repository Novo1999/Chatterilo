import { useConversationContext } from '@/context'
import customFetch from '@/utils/misc/customFetch'
import { useQuery } from '@tanstack/react-query'

const getSingleConversation = async (id: string) => {
  try {
    const data = await customFetch.get(`/conversation/${id}`)
    return data
  } catch (error) {
    throw error
  }
}

const useGetConversation = (conversationId: string) => {
  const { conversations, setConversations } = useConversationContext()!

  console.log(conversations)

  const query = useQuery({
    queryKey: ['conversation', conversationId],
    queryFn: async () => {
      const conversation = await getSingleConversation(conversationId)

      if (!conversation) return

      setConversations((prev: IConversationObj[]) => {
        if (!prev) return prev;
        if (!prev.some((conv) => conv._id === conversation?.data?._id)) {
          return [...prev, conversation?.data];
        }
        return prev;
      });
      
      return conversation
    },
    enabled: !!conversationId
  })

  return query
}
export default useGetConversation


