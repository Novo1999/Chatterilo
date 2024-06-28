import customFetch from '@/utils/misc/customFetch'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

const sendFriendRequest = async (id: string) => {
  try {
    const data = await customFetch.post(`/user/send-friend-request/${id}`)
    return data
  } catch (error) {
    throw error
  }
}
const cancelFriendRequest = async (id: string) => {
  try {
    const data = await customFetch.delete(`/user/cancel-friend-request/${id}`)
    return data
  } catch (error) {
    throw error
  }
}

const useFriendRequest = (functionality: string) => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (id: string) =>
      functionality === 'send'
        ? sendFriendRequest(id)
        : cancelFriendRequest(id),
    onSuccess: (data) => {
      toast.success(data.data.message)
      queryClient.invalidateQueries({
        queryKey: ['current-user'],
      })
    },
    onError: (data) => {
      if (data instanceof AxiosError) toast.error(data?.response?.data?.error)
    },
  })
  return mutation
}
export default useFriendRequest
