import customFetch from '@/utils/misc/customFetch'
import { useQuery } from '@tanstack/react-query'

export const getConversations = async () => {
  try {
    const conversations = await customFetch.get('/conversation/all')
    return conversations
  } catch (error) {
    throw error
  }
}

const useGetConversations = () => {
  const query = useQuery({
    queryKey: ['my-conversations'],
    queryFn: getConversations,
  })
  return query
}
export default useGetConversations
