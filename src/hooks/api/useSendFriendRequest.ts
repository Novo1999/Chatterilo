import customFetch from '@/utils/customFetch'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

const sendFriendRequest = async (id: string) => {
  try {
    const data = await customFetch.post(`/user/${id}`)
    return data
  } catch (error) {
    throw error
  }
}

const useSendFriendRequest = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (id: string) => sendFriendRequest(id),
    onSuccess: (data) => {
      console.log(data)
      toast.success(data.data.message)
      queryClient.invalidateQueries({
        queryKey: ['current-user'],
      })
    },
    onError: (data) => {
      console.log(data)
      if (data instanceof AxiosError) toast.error(data?.response?.data?.error)
    },
  })
  return mutation
}
export default useSendFriendRequest
