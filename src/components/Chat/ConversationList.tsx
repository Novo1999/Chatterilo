'use client'
import useGetConversations from '@/hooks/api/useGetConversations'
import { Loader2 } from 'lucide-react'
import ConversationListItem from './ConversationListItem'

const ConversationList = () => {
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
    content = data.map((conv: IConversation) => (
      <ConversationListItem key={conv._id} conversation={conv} />
    ))
  }
  if (!isLoading && !isError && data.length === 0) {
    content = <p className='text-slate-200'>No Data</p>
  }

  return content
}
export default ConversationList
