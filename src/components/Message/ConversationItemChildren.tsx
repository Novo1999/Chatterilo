import useGetConversation from '@/hooks/api/useGetConversation'
import useConnectedUserContext from '@/hooks/contextHooks/useConnectedUserContext'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import ErrorResponse from '../misc/ErrorResponse'

const ConversationItemChildren = ({
  conversationId,
}: {
  conversationId: IConversation['_id']
}) => {
  const { connectedUsers } = useConnectedUserContext()

  const {
    data: conversation,
    isLoading,
    isError,
    error,
  } = useGetConversation(conversationId)

  let content = null

  if (!isError && isLoading) {
    content = <Loader2 className='animate-spin' />
  }

  if (!isLoading && isError) {
    content = (
      <ErrorResponse className='text-black'>{error?.message}</ErrorResponse>
    )
  }

  if (!isLoading && !isError && conversation?.messages?.length > 0) {
    content = <p>No messages</p>
  }

  if (!isLoading && !isError && conversation?.messages?.length > 0) {
    const { messages, recipientUser } = conversation
    content = (
      <>
        <div className='relative'>
          <Image
            src='https://i.pravatar.cc/300'
            width={300}
            height={300}
            className='w-12 rounded-full'
            alt='avatar'
          />
          {/* shows if user is online */}
          {connectedUsers.map((user) => user.id).includes(recipientUser._id) ? (
            <div className='rounded-full bg-green-500 size-3 absolute top-8 right-0'></div>
          ) : (
            <div className='rounded-full bg-gray-500 size-3 absolute top-10 right-0'></div>
          )}
        </div>
        <div className='text-xs'>
          <p className='font-bold'>{recipientUser?.username}</p>
          <div className='*:text-gray-100'>
            <p className='block min-[375px]:hidden'>
              {`${
                messages?.length > 0
                  ? messages[messages.length - 1].content.slice(1, 40)
                  : `Start a conversation with ${recipientUser?.username}`
              }...`}
            </p>
            <p className='hidden min-[375px]:block min-[425px]:hidden'>
              {`${
                messages?.length > 0
                  ? messages[messages.length - 1].content.slice(1, 50)
                  : `Start a conversation with ${recipientUser?.username}`
              }...`}
            </p>
            <p className='hidden min-[425px]:block'>
              {`${
                messages?.length > 0
                  ? messages[messages.length - 1].content.slice(1, 80)
                  : `Start a conversation with ${recipientUser?.username}`
              }...`}
            </p>
          </div>
        </div>
        <div className='text-xs font-thin'>
          <p className='text-slate-100 italic font-light'>4:03pm</p>
        </div>
      </>
    )
  }

  return content
}
export default ConversationItemChildren
