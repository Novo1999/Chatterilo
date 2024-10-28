import customFetch from '@/utils/misc/customFetch'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const createConversation = async (receiverId: string) => {
  try {
    const data = await customFetch.post(`/conversation/${receiverId}`)
    return data
  } catch (error) {
    throw error
  }
}

const useCreateConversation = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (receiverId: string) => createConversation(receiverId),
    onSuccess: () => {
      for (const key of ['my-conversations', 'current-user']) {
        queryClient.invalidateQueries({
          queryKey: [
            key,
          ],
          exact: true,
        })
      }

    },
  })

  return mutation
}

export default useCreateConversation
