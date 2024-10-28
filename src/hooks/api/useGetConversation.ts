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
  const query = useQuery({
    queryKey: ['conversation', conversationId],
    queryFn: () => getSingleConversation(conversationId),
  })

  return query
}
export default useGetConversation
