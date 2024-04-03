import Image from 'next/image'

interface MessageProp {
  position: string
}

const MessageText = () => {
  return (
    <p className='bg-green-400 p-2 lg:p-3 max-w-48 xl:max-w-96 md:max-w-60 rounded-xl text-slate-800'>
      Omg, this is a message! Omg, this is a message! Omg, this is a message!
      Omg, this is a message! Omg, this is a message! Omg, this is a message!
    </p>
  )
}

const Message = ({ position }: MessageProp) => {
  // if position left
  if (position === 'left') {
    return (
      <div className='flex items-start gap-3'>
        <Image
          src='https://i.pravatar.cc/300'
          width={300}
          height={300}
          alt='avatar'
          className='size-10 rounded-full'
        />
        <MessageText />
      </div>
    )
  } else {
    return (
      <div className='flex items-start justify-end gap-3'>
        <MessageText />
        <Image
          src='https://i.pravatar.cc/300'
          width={300}
          height={300}
          alt='avatar'
          className='size-10 rounded-full'
        />
      </div>
    )
  }
}
export default Message
