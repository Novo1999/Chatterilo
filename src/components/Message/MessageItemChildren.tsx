import useGetUser from '@/hooks/api/useGetUser'
import useConnectedUserContext from '@/hooks/contextHooks/useConnectedUserContext'
import Image from 'next/image'

const MessageItemChildren = ({
  conversation,
}: {
  conversation: IConversation
}) => {
  const { connectedUsers } = useConnectedUserContext()

  const { messages, recipientUserId } = conversation
  const { data: recipient } = useGetUser(recipientUserId)

  return (
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
        {connectedUsers.map((user) => user.id).includes(recipientUserId) ? (
          <div className='rounded-full bg-green-500 size-3 absolute top-8 right-0'></div>
        ) : (
          <div className='rounded-full bg-gray-500 size-3 absolute top-10 right-0'></div>
        )}
      </div>
      <div className='text-xs'>
        <p className='font-bold'>{recipient?.data.username}</p>
        <div className='*:text-gray-100'>
          <p className='block min-[375px]:hidden'>
            {`${
              messages.length > 0
                ? messages[messages.length - 1].content.slice(1, 40)
                : `Start a conversation with ${recipient?.data.username}`
            }...`}
          </p>
          <p className='hidden min-[375px]:block min-[425px]:hidden'>
            {`${
              messages.length > 0
                ? messages[messages.length - 1].content.slice(1, 50)
                : `Start a conversation with ${recipient?.data.username}`
            }...`}
          </p>
          <p className='hidden min-[425px]:block'>
            {`${
              messages.length > 0
                ? messages[messages.length - 1].content.slice(1, 80)
                : `Start a conversation with ${recipient?.data.username}`
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
export default MessageItemChildren
