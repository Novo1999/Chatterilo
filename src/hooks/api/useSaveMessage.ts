import customFetch from '@/utils/customFetch'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const addToConversation = async ({
  conversationId,
  messageObj,
}: ISaveMessage) => {
  try {
    const { data } = await customFetch({
      method: 'patch',
      url: `/conversation/${conversationId}`,
      data: {
        conversationId,
        messageObj,
      },
    })
    return data
  } catch (error) {
    throw error
  }
}
const useSaveMessage = () => {
  const queryClient = useQueryClient()

  // const mutation = useMutation({
  //   mutationFn: ({conversationId, messageObj}: ISaveMessage) => {},
  // })
  // return mutation
}
export default useSaveMessage
