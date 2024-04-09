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

const useDeclineFriendRequest = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (id: string) => declineFriendRequest(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['current-user'] }),
  })

  return mutation
}
export default useDeclineFriendRequest
