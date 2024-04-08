'use client'
import { socket } from '@/lib/socket'
import {
  ArrowLeft,
  Info,
  Paperclip,
  PhoneCall,
  Send,
  VideoIcon,
} from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import MessagesContainer from './MessagesContainer'
import { Input } from './ui/input'

type MessageInput = {
  message: string
}

const Chatbox = () => {
  const pathname = usePathname()
  const { register, handleSubmit, resetField } = useForm<MessageInput>()

  const sendMessage = (message: string) => {
    socket.emit('message', message)
  }

  const onSubmit: SubmitHandler<MessageInput> = (data) => {
    sendMessage(data.message)
    resetField('message')
  }

  return (
    <div
      className={`w-80 min-[375px]:w-96 min-[425px]:w-[35rem] ${
        pathname.startsWith('/messages') ? 'flex' : 'hidden'
      } sm:w-[25rem] lg:w-[37rem] md:w-[28rem] xl:w-full md:flex flex-col justify-between ml-2 rounded-md shadow-slate-400 p-4 shadow-sm`}
    >
      <nav className='flex-between text-gray-200 text-xs'>
        {/* nav left */}
        <div className='flex gap-2 items-center'>
          <ArrowLeft className='block md:hidden' />
          <Image
            width={300}
            height={300}
            alt='avatar'
            className='size-12 rounded-full'
            src='https://i.pravatar.cc/300'
          />
          <div className='flex flex-col justify-center'>
            <h1 className='font-bold whitespace-break-spaces'>
              Florencio Dollorence
            </h1>
            <div className='flex gap-2 items-center'>
              <div className='bg-green-500 rounded-full size-2'></div>
              <p className='font-thin'>Online</p>
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
      {/* message content */}

      <MessagesContainer />

      {/* bottom input and button */}
      <div className='flex items-center gap-2'>
        <div className='text-white'>
          <Paperclip />{' '}
        </div>
        <div className='flex-grow relative'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              gradient='teal'
              className='bg-slate-700 text-white w-full'
              placeholder='Write your message...'
              type='text'
              {...register('message', { required: true })}
            />
            <button className='text-white absolute right-4 bottom-2'>
              <Send />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Chatbox
