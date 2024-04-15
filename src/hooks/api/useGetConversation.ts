import customFetch from '@/utils/customFetch'
import { useQuery } from '@tanstack/react-query'

export const getConversation = async (id: string) => {
  try {
    const { data } = await customFetch.get(`/conversation/${id}`)
    return data
  } catch (error) {
    throw error
  }
}

const useGetConversation = (id: string) => {
  const query = useQuery({
    queryKey: ['conversation', id],
    queryFn: () => getConversation(id),
  })

  return query
}

export default useGetConversation
