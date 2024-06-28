import customFetch from '@/utils/misc/customFetch'
import { useQueries } from '@tanstack/react-query'

export const getUser = async (id: string) => {
  try {
    const { data } = await customFetch.get(`/user/users/${id}`)
    return data
  } catch (error) {
    throw error
  }
}

const useGetFriendRequests = (
  friendRequests: string[] = [],
  isOpen: boolean
) => {
  const results = useQueries({
    queries: friendRequests.map((id) => ({
      queryKey: ['friend-req', id],
      queryFn: () => getUser(id),
      enabled: isOpen,
    })),
  })

  return results
}
export default useGetFriendRequests
