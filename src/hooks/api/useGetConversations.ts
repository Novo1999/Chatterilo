import customFetch from '@/utils/customFetch'
import { useQueries, useQuery } from '@tanstack/react-query'

const getConversations = async () => {
  try {
    const { data } = await customFetch.get(`/conversation/all`)
    return data
  } catch (error) {
    throw error
  }
}

const useGetConversations = () => {
  const query = useQuery({
    queryKey: ['conversations'],
    queryFn: getConversations,
  })

  return query
}

export default useGetConversations
