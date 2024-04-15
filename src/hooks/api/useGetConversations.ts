import customFetch from '@/utils/customFetch'
import { useQueries } from '@tanstack/react-query'

export const getConversation = async (id: string) => {
  try {
    const { data } = await customFetch.get(`/conversation/${id}`)

    return data
  } catch (error) {
    throw error
  }
}

const useGetConversations = (ids: string[]) => {
  const queries = useQueries({
    queries: ids?.map((id) => ({
      queryKey: ['conversation', id],
      queryFn: () => getConversation(id),
    })),
  })

  return queries
}

export default useGetConversations
