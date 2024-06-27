import customFetch from '@/utils/customFetch'
import { useMutation } from '@tanstack/react-query'

const createConversation = async (receiverId: string) => {
  try {
    const data = await customFetch.post(`/conversation/${receiverId}`)
    console.log(data)
    return data
  } catch (error) {
    throw error
  }
}

const useCreateConversation = () => {
  const mutation = useMutation({
    mutationFn: (receiverId: string) => createConversation(receiverId),
    onSuccess: (data) => {
      console.log(data)
    },
  })
  return mutation
}

export default useCreateConversation
