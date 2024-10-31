import customFetch from '@/utils/misc/customFetch'
import { useMutation } from '@tanstack/react-query'

const sendMessage = async (sender: string, message: string) => {
    try {
        const data = await customFetch.post('/conversation/message/send-message', { sender, message })
        return data
    } catch (error) {
        throw error
    }
}

const useSendMessage = () => {
    const mutation = useMutation(
        {
            mutationFn: ({ sender, message }: { sender: string, message: string }) => sendMessage(sender, message)
        }
    )

    return mutation
}
export default useSendMessage
