import { useGetCurrentUser } from '@/hooks/api/useGetCurrentUser'
import useSendMessage from '@/hooks/api/useSendMessage'
import useChatBox from '@/hooks/useChatBox'
import { useQueryClient } from '@tanstack/react-query'
import { Paperclip, Send } from 'lucide-react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '../ui/input'

const ChatInput = () => {
  const { register, handleSubmit } = useForm()
  const { mutate } = useSendMessage()
  const { data } = useGetCurrentUser()
  const { emitSendMessage, conversationId } = useChatBox()
  const queryClient = useQueryClient()


  const onSubmit: SubmitHandler<FieldValues> = async (inputData) => {
    const userId = data?.data?.user?._id

    mutate({ sender: userId, message: inputData.message })

    emitSendMessage(inputData.message)

    queryClient.invalidateQueries({
      queryKey: ['conversation', conversationId]
    })
  }

  const { emitUserTyping } = useChatBox()

  return (
    <div className='flex items-center gap-2 px-4 chat-input'>
      <div className='text-white'>
        <Paperclip />{' '}
      </div>
      <div className='flex-grow relative'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            purpose='type-message'
            gradient='purple'
            className='bg-[#2E4756] w-full text-white'
            placeholder='Write your message...'
            type='text'
            onKeyDown={emitUserTyping}
            {...register('message', { required: true })}
          />
          <button className='text-white absolute right-4 bottom-2 send-btn'>
            <Send />
          </button>
        </form>
      </div>
    </div>
  )
}
export default ChatInput
