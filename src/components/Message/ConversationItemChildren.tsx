import useAuthContext from '@/hooks/contextHooks/useAuthContext'
import useConnectedUserContext from '@/hooks/contextHooks/useConnectedUserContext'
import Image from 'next/image'

const ConversationItemChildren = ({
  conversation,
}: {
  conversation: IConversation
}) => {
  const { connectedUsers } = useConnectedUserContext()
  const { user } = useAuthContext()

  const { messages, recipientUser, currentUser } = conversation
  const hasMessage = messages?.length > 0

  const getSlicedMessage = (sliceEnd: number) => {
    const lastMessage = messages[messages.length - 1]?.content

    if (hasMessage) {
      if (lastMessage.length > 20) {
        return `${lastMessage.slice(0, sliceEnd)}...`
      } else {
        return lastMessage
      }
    } else {
      return `Start a conversation with ${
        user?._id === conversation.currentUser?._id
          ? recipientUser?.username
          : conversation?.currentUser?.username
      }`
    }
  }

  return (
    <>
      <div className='flex gap-4 items-center'>
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
          <p className='font-bold'>
            {user?._id === conversation.currentUser?._id
              ? recipientUser?.username
              : conversation?.currentUser?.username}
          </p>
          <div className='*:text-gray-100'>
            <p className='block min-[375px]:hidden'>{getSlicedMessage(20)}</p>
            <p className='hidden min-[375px]:block min-[425px]:hidden'>
              {getSlicedMessage(40)}
            </p>
            <p className='hidden min-[425px]:block'>{getSlicedMessage(60)}</p>
          </div>
        </div>
      </div>
      <div className='text-xs font-thin'>
        <p className='text-slate-100 italic font-light'>4:03pm</p>
      </div>
    </>
  )
}

export default ConversationItemChildren
