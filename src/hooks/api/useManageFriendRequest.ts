import customFetch from '@/utils/customFetch'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const declineFriendRequest = async (id: string) => {
  try {
    const data = await customFetch.patch(`/friend/decline-friend-request/${id}`)
    return data
  } catch (error) {
    throw error
  }
}
const acceptFriendRequest = async (id: string) => {
  try {
    const data = await customFetch.patch(`/friend/accept-friend-request/${id}`)
    return data
  } catch (error) {
    throw error
  }
}

const useManageFriendRequest = (manageType: string) => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (id: string) =>
      manageType === 'ACCEPT'
        ? acceptFriendRequest(id)
        : declineFriendRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['current-user'] })
    },
  })

  return mutation
}
export default useManageFriendRequest
