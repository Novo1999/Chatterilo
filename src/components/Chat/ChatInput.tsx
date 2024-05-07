import useChatBox from '@/hooks/useChatBox'
import { Paperclip, Send } from 'lucide-react'
import { Input } from '../ui/input'

const ChatInput = () => {
  const { handleSubmit, onSubmit, register, emitUserTyping } = useChatBox()

  return (
    <div className='flex items-center gap-2 px-4'>
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
          <button className='text-slate-800 absolute right-4 bottom-2'>
            <Send />
          </button>
        </form>
      </div>
    </div>
  )
}
export default ChatInput
