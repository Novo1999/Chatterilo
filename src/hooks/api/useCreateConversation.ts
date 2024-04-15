import customFetch from '@/utils/customFetch'
import { useMutation } from '@tanstack/react-query'

export const createConversation = async (id: string) => {
  try {
    const { data } = await customFetch.post(`/conversation/${id}`)
    return data
  } catch (error) {
    throw error
  }
}

const useCreateConversation = () => {
  const mutation = useMutation({
    mutationFn: (id: string) => createConversation(id),
  })

  return mutation
}

export default useCreateConversation
