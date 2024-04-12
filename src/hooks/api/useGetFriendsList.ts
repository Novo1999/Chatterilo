import { useQueries } from '@tanstack/react-query'
import { getUser } from './useGetFriendRequests'

const useGetFriendsList = (friends: string[] = [], isOpen: boolean) => {
  const results = useQueries({
    queries: friends.map((id) => ({
      queryKey: ['friend', id],
      queryFn: () => getUser(id),
      enabled: isOpen,
    })),
  })

  return results
}
export default useGetFriendsList
