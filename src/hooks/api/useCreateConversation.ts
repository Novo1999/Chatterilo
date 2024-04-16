import customFetch from '@/utils/customFetch'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAddToConversation from './useAddToConversation'

export const createConversation = async (id: string) => {
  try {
    const { data } = await customFetch.post(`/conversation/${id}`)
    return data
  } catch (error) {
    throw error
  }
}

const useCreateConversation = () => {
  const { mutate: addToConversationMutate } = useAddToConversation()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (id: string) => createConversation(id),
    onSuccess: (data) => {
      addToConversationMutate(data._id)
      queryClient.invalidateQueries({ queryKey: ['current-user'] })
    },
  })

  return mutation
}

export default useCreateConversation
