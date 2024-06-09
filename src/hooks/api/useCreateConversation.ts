import customFetch from '@/utils/customFetch'
import { useMutation } from '@tanstack/react-query'
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

  const mutation = useMutation({
    mutationFn: (id: string) => createConversation(id),
    onSuccess: (data) => {
      console.log('🚀 ~ useCreateConversation ~ data:', data)
      addToConversationMutate({
        recipientId: data.recipientUser,
        conversationId: data._id,
      })
    },
  })

  return mutation
}

export default useCreateConversation
