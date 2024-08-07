import { ArrowLeft, Info, PhoneCall, VideoIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const ChatNav = ({ recipientName }: { recipientName: string }) => {
  return (
    <nav className='flex-between text-gray-200 px-4 py-4 relative bottom-4 bg-[#2E4756] text-xs'>
      {/* nav left */}
      <div className='flex gap-2 items-center'>
        <Link href='/'>
          <ArrowLeft className='block md:hidden' />
        </Link>
        <Image
          width={300}
          height={300}
          alt='avatar'
          className='w-12 rounded-full'
          src='https://i.pravatar.cc/300'
        />
        <div className='flex flex-col justify-center relative'>
          <h1 className='font-bold whitespace-break-spaces'>{recipientName}</h1>
          {/* online status */}
          <div className='flex gap-2 items-center'>
            {/* {connectedUsers
              .map((user) => user.id)
              .includes(recipientUser?._id as string) ? (
              <div className='rounded-full bg-green-500 size-3'></div>
            ) : (
              <div className='rounded-full bg-gray-500 size-3'></div>
            )}
            {connectedUsers
              .map((user) => user.id)
              .includes(recipientUser?._id as string) ? (
              <p className='font-thin relative'>Online</p>
            ) : (
              <p className='font-thin relative'>Offline</p>
            )} */}
          </div>
        </div>
      </div>
      {/* nav right */}
      <div className='flex gap-3'>
        <div>
          <PhoneCall />
        </div>
        <div>
          <VideoIcon />
        </div>
        <div>
          <Info />
        </div>
      </div>
    </nav>
  )
}
export default ChatNav
