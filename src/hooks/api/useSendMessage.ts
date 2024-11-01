import { useConversationContext } from '@/context'
import customFetch from '@/utils/misc/customFetch'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const sendMessage = async (sender: string, message: string) => {
    try {
        const data = await customFetch.post('/conversation/message/send-message', { sender, message })
        return data
    } catch (error) {
        throw error
    }
}

const useSendMessage = () => {
    const { setConversations } = useConversationContext()!
    const queryClient = useQueryClient()
    const mutation = useMutation(
        {
            mutationFn: ({ sender, message }: { sender: string, message: string }) => sendMessage(sender, message)
            , onSuccess: (data) => {
                console.log(data)

                // update global state
                setConversations((prevConversations: IConversationObj[]) => {
                    const matchedConversationIndex = prevConversations?.findIndex(
                        (conv) => conv._id === data?.data?.conversationId
                    )
                    if (matchedConversationIndex === -1) return prevConversations

                    const updatedConversations = [...prevConversations]
                    const matchedConversation = { ...updatedConversations[matchedConversationIndex] }

                    matchedConversation.messages = [
                        ...matchedConversation.messages,
                        data?.data?.newMessage
                    ]
                    updatedConversations[matchedConversationIndex] = matchedConversation

                    return updatedConversations
                })

                // invalidate the conversation
                queryClient.invalidateQueries({
                    queryKey: ['conversation', data?.data?.conversationId]
                })
            }
        }
    )

    return mutation
}
export default useSendMessage
