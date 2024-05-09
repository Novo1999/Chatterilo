import customFetch from '@/utils/customFetch'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const addToConversation = async ({
  recipientId,
  conversationId,
}: IConversationObj) => {
  try {
    const { data } = await customFetch({
      method: 'patch',
      url: `/friend/add-to-conversation/${conversationId}`,
      data: {
        recipientId,
      },
    })
    return data
  } catch (error) {
    throw error
  }
}

const useAddToConversation = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: ({ recipientId, conversationId }: IConversationObj) =>
      addToConversation({ recipientId, conversationId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['current-user'] })
      queryClient.invalidateQueries({ queryKey: ['conversations'] })
    },
  })

  return mutation
}
export default useAddToConversation
