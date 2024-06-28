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
  const mutation = useMutation({
    mutationFn: (receiverId: string) => createConversation(receiverId),
  })
  return mutation
}

export default useCreateConversation
