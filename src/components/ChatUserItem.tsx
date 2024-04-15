'use client'
import useGetConversations from '@/hooks/api/useGetConversations'
import useAuthContext from '@/hooks/contextHooks/useAuthContext'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import MessageItem from './Message/MessageItem'

const ChatUserItem = () => {
  const { user: { conversations } = {} } = useAuthContext()
  const queries = useGetConversations((conversations as string[]) ?? [])

  return queries.map(({ isLoading, data, isError, error }, index) => {
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
    if (!isLoading && !isError && data._id) {
      content = <MessageItem key={data._id} conversation={data} />
    }
    if (!isLoading && !isError && !data._id) {
      content = <p className='text-slate-200'>No Data</p>
    }

    return content
  })
}
export default ChatUserItem
