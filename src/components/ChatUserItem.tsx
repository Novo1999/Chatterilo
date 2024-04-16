'use client'
import useGetConversations from '@/hooks/api/useGetConversations'
import useAuthContext from '@/hooks/contextHooks/useAuthContext'
import { Loader2 } from 'lucide-react'
import MessageItem, { Conversation } from './Message/MessageItem'

const ChatUserItem = () => {
  const { user: { conversations } = {} } = useAuthContext()
  const { data, isLoading, isError, error } = useGetConversations()

  let content = null

  if (isLoading && !isError) {
    content = (
      <div key={crypto.randomUUID()} className='min-h-12 flex-center'>
        <Loader2 className='animate-spin text-slate-50' />
      </div>
    )
  }
  if (!isLoading && isError) {
    content = (
      <p key={crypto.randomUUID()} className='text-red-500 text-xl'>
        Error
      </p>
    )
  }
  if (!isLoading && !isError && data.length > 0) {
    content = data.map((item: Conversation) => (
      <MessageItem key={item._id} conversation={item} />
    ))
  }
  if (!isLoading && !isError && data.length === 0) {
    content = <p className='text-slate-200'>No Data</p>
  }

  return content
}
export default ChatUserItem
