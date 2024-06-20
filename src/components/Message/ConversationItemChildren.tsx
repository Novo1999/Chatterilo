import Image from 'next/image'

const ConversationItemChildren = () => {
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
          {true ? (
            <div className='rounded-full bg-green-500 size-3 absolute top-8 right-0'></div>
          ) : (
            <div className='rounded-full bg-gray-500 size-3 absolute top-10 right-0'></div>
          )}
        </div>
        <div className='text-xs'>
          <p className='font-bold'>username</p>
          <div className='*:text-gray-100'>
            <p className='block min-[375px]:hidden'>{'MESSAGE'}</p>
            <p className='hidden min-[375px]:block min-[425px]:hidden'>
              {'MESSAGE'}
            </p>
            <p className='hidden min-[425px]:block'>{'MESSAGE'}</p>
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
