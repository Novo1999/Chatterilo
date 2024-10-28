import customFetch from '@/utils/misc/customFetch'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

const sendMessage = async (sender: string, message: string) => {
    try {
        const data = await customFetch.post('/conversation/message/send-message', { sender, message })
        console.log("🚀 ~ sendMessage ~ data:", data)
        return data
    } catch (error) {
        throw error
    }
}

const useSendMessage = () => {
    const searchParams = useSearchParams()
    const conversationId = searchParams.get("conversation")
    const queryClient = useQueryClient()
    const mutation = useMutation(
        {
            mutationFn: ({ sender, message }: { sender: string, message: string }) => sendMessage(sender, message)
            , onMutate: () => {
                queryClient.invalidateQueries({
                    queryKey: ['conversation', conversationId]
                })
            }
        }
    )

    return mutation
}
export default useSendMessage
