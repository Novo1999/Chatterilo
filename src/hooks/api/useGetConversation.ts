import customFetch from '@/utils/customFetch'
import { useQuery } from '@tanstack/react-query'

const getConversation = async (conversationId: string) => {
  try {
    const { data } = await customFetch.get(`/conversation/${conversationId}`)
    return data
  } catch (error) {
    throw error
  }
}

const useGetConversation = (conversationId: string) => {
  const query = useQuery({
    queryKey: ['conversation', conversationId],
    queryFn: () => getConversation(conversationId),
    enabled: !!conversationId,
  })

  return query
}

export default useGetConversation
