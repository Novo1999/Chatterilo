import customFetch from '@/utils/customFetch'
import { useMutation } from '@tanstack/react-query'

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
  const mutation = useMutation({
    mutationFn: (id: string) => addToConversation(id),
  })

  return mutation
}
export default useAddToConversation
