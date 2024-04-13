import customFetch from '@/utils/customFetch'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export const unfriend = async (id: string) => {
  try {
    const { data } = await customFetch.patch(`/friend/unfriend/${id}`)
    return data
  } catch (error) {
    throw error
  }
}

const useUnfriend = () => {
  const queryClient = useQueryClient()
  let toastPromise
  const mutation = useMutation({
    mutationFn: (id: string) => {
      toastPromise = unfriend(id)
      // show loading, success message and error message
      toast.promise(toastPromise, {
        loading: 'Loading',
        success: (data) => `You unfriended ${data.updatedSender.username}`,
        error: (err) => `Error unfriending: ${err?.response?.data?.msg}`,
      })
      return toastPromise
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['current-user'] }),
  })

  return mutation
}
export default useUnfriend
