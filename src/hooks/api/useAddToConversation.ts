import customFetch from '@/utils/customFetch'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export interface ConversationObj {
  recipientId: string
  conversationId: string
}

export const addToConversation = async ({
  recipientId,
  conversationId,
}: ConversationObj) => {
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
    mutationFn: ({ recipientId, conversationId }: ConversationObj) =>
      addToConversation({ recipientId, conversationId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['current-user'] })
      queryClient.invalidateQueries({ queryKey: ['conversations'] })
    },
  })

  return mutation
}
export default useAddToConversation
