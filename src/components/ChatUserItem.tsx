import Image from 'next/image'

const ChatUserItem = () => {
  return Array.from({ length: 10 }).map((_, index) => {
    return (
      <div
        key={index}
        className='grid grid-cols-[50px_130px_50px] min-[375px]:grid-cols-[50px_190px_40px] min-[425px]:grid-cols-[50px_240px_50px] gap-4 *:text-gray-200'
      >
        <Image
          src='https://i.pravatar.cc/300'
          width={300}
          height={300}
          className='size-12 rounded-full'
          alt='avatar'
        />
        <div className='text-xs'>
          <p>Novodip Mondal</p>
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
          <p className='hidden min-[425px]:block sm:hidden'>
            {`${'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, distinctio'.slice(
              1,
              80
            )}...`}
          </p>
        </div>
        <div className='text-xs'>
          <p>4:03pm</p>
        </div>
      </div>
    )
  })
}
export default ChatUserItem
