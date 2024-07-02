import customFetch from '@/utils/misc/customFetch'
import { useQuery } from '@tanstack/react-query'

const useGetConversationLength = () => {
  const query = useQuery({
    queryKey: ['total-conversations'],
    queryFn: async () => {
      return await customFetch.get('/conversation/total/conversations')
    },
  })

  return query
}
export default useGetConversationLength
