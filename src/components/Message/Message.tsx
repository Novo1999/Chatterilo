import moment from 'moment'
import Image from 'next/image'
import { ReactNode } from 'react'
import MessageText from './MessageText'

const Message = ({ position, message }: MessageProp) => {
  const { message: messageText, timestamp } = message
  // const isToday = moment().isSame(timestamp.split(' ')[0], 'day')
  // const formattedTimestamp = isToday
  //   ? `${timestamp.split(' ')[1]} ${timestamp.split(' ')[2]}`
  //   : timestamp.split(' ')[0]

  // if position left
  if (position === 'left') {
    return (
      <div className='flex items-start flex-col'>
        <div className='flex gap-2'>
          <Image
            src='https://i.pravatar.cc/300'
            width={300}
            height={300}
            alt='avatar'
            className='size-10 rounded-full'
          />
          <MessageText>{messageText}</MessageText>
        </div>
        <p className='text-[8px] italic opacity-80'>{""}</p>
      </div>
    )
  } else {
    return (
      <div className='flex flex-col items-end justify-end'>
        <div className='flex gap-2'>
          <MessageText>{messageText}</MessageText>
          <Image
            src='https://i.pravatar.cc/300'
            width={300}
            height={300}
            alt='avatar'
            className='size-10 rounded-full'
          />
        </div>
        <p className='text-[8px] italic opacity-80'>{""}</p>
      </div>
    )
  }
}
export default Message
