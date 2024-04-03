import Image from 'next/image'

const ChatUserItem = () => {
  return Array.from({ length: 10 }).map((_, index) => {
    return (
      <div
        key={index}
        className='grid grid-cols-[50px_170px_50px] min-[375px]:grid-cols-[50px_225px_40px] min-[425px]:grid-cols-[50px_275px_50px] md:grid-cols-[50px_170px_50px] lg:grid-cols-[50px_250px_50px] gap-4 xl:grid-cols-[50px_250px_50px] *:text-gray-200'
      >
        <Image
          src='https://i.pravatar.cc/300'
          width={300}
          height={300}
          className='size-12 rounded-full'
          alt='avatar'
        />
        <div className='text-xs'>
          <p className='font-bold'>Novodip Mondal</p>
          <div className='*:text-gray-400'>
            <p className='block min-[375px]:hidden'>
              {`${'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, distinctio'.slice(
                1,
                40
              )}...`}
            </p>
            <p className='hidden min-[375px]:block min-[425px]:hidden'>
              {`${'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, distinctio'.slice(
                1,
                50
              )}...`}
            </p>
            <p className='hidden min-[425px]:block'>
              {`${'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, distinctio'.slice(
                1,
                80
              )}...`}
            </p>
          </div>
        </div>
        <div className='text-xs font-thin'>
          <p className='text-blue-200'>4:03pm</p>
        </div>
      </div>
    )
  })
}
export default ChatUserItem
