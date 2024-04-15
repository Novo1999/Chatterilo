import customFetch from '@/utils/customFetch'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useCreateConversation from './useCreateConversation'

export const addToConversation = async (id: string) => {
  try {
    const { data } = await customFetch.patch(
      `/friend/add-to-conversation/${id}`
    )
    return data
  } catch (error) {
    throw error
  }
}

const useAddToConversation = () => {
  const queryClient = useQueryClient()
  const { mutate: createConversationMutate } = useCreateConversation()

  const mutation = useMutation({
    mutationFn: (id: string) => addToConversation(id),

    onSuccess: (data, id) => {
      console.log('🚀 ~ useAddToConversation ~ data:', data)
      createConversationMutate(id)
      queryClient.invalidateQueries({ queryKey: ['current-user'] })
    },
  })

  return mutation
}
export default useAddToConversation
