import { Info, PhoneCall, VideoIcon } from 'lucide-react'
import Image from 'next/image'

const Chatbox = () => {
  return (
    <div className='p-3 w-[25rem] lg:w-[37rem] xl:w-full hidden md:block'>
      <nav className='flex-between text-gray-200 text-xs'>
        {/* nav left */}
        <div className='flex gap-2'>
          <Image
            width={300}
            height={300}
            alt='avatar'
            className='size-12 rounded-full'
            src='https://i.pravatar.cc/300'
          />
          <div className='flex flex-col justify-center'>
            <h1 className='font-bold'>Florencio Dorrance</h1>
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
    </div>
  )
}
export default Chatbox
