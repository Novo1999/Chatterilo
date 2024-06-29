import useConnectedUserContext from '@/hooks/contextHooks/useConnectedUserContext'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const DEVICE_TYPE_MOBILE = 'mobile'

const ConversationItemChildren = ({
  deviceType,
  receiverDetails,
  conversation,
}: IConversationItemChildren) => {
  const {
    participant1,
    participant2,
    _id: conversationId,
    lastMessage,
    messages,
  } = conversation
  const { connectedUsers } = useConnectedUserContext()
  const { replace } = useRouter()
  console.log('🚀 ~ connectedUsers:', connectedUsers)
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const handleSelectChat = (conversationId: string) => {
    const params = new URLSearchParams(searchParams)
    if (conversationId) {
      params.set('conversation', conversationId)
    } else {
      params.delete('conversation', conversationId)
    }
    replace(`${pathname}?${params.toString()}`)
  }

  if (deviceType === DEVICE_TYPE_MOBILE) {
    return (
      <Link
        className='flex sm:hidden justify-between items-center px-2 gap-2 *:text-gray-100 cursor-pointer py-4 rounded-md border border-white border-opacity-50 shadow-md'
        href={`messages/${receiverDetails?.receiverId}`}
        // TODO: add path id here
      >
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
            {true ? (
              <div className='rounded-full bg-green-500 size-3 absolute top-8 right-0'></div>
            ) : (
              <div className='rounded-full bg-gray-500 size-3 absolute top-10 right-0'></div>
            )}
          </div>
          <div className='text-xs'>
            <p className='font-bold'>{receiverDetails?.userName}</p>
            <div className='*:text-gray-100'>
              <p className='block min-[375px]:hidden'>{lastMessage}</p>
              <p className='hidden min-[375px]:block min-[425px]:hidden'>
                {lastMessage}
              </p>
              <p className='hidden min-[425px]:block'>{lastMessage}</p>
            </div>
          </div>
        </div>
        <div className='text-xs font-thin'>
          <p className='text-slate-100 italic font-light'>4:03pm</p>
        </div>
      </Link>
    )
  } else {
    return (
      <div
        onClick={() => handleSelectChat(conversationId)}
        className='hidden sm:flex justify-between items-center px-2 gap-2 *:text-gray-100 cursor-pointer py-4 rounded-md border border-white border-opacity-50 shadow-md'
      >
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
            {true ? (
              <div className='rounded-full bg-green-500 size-3 absolute top-8 right-0'></div>
            ) : (
              <div className='rounded-full bg-gray-500 size-3 absolute top-10 right-0'></div>
            )}
          </div>
          <div className='text-xs'>
            <p className='font-bold'>{receiverDetails?.userName}</p>

            <div className='*:text-gray-100'>
              <p className='block min-[375px]:hidden'>{lastMessage}</p>
              <p className='hidden min-[375px]:block min-[425px]:hidden'>
                {lastMessage}
              </p>
              <p className='hidden min-[425px]:block'>{lastMessage}</p>
            </div>
          </div>
        </div>
        <div className='text-xs font-thin'>
          <p className='text-slate-100 italic font-light'>4:03pm</p>
        </div>
      </div>
    )
  }
}

export default ConversationItemChildren
