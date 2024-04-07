import { User } from '@/context'
import useMenuAnimation from '@/hooks/useMenuAnimation'
import Link from 'next/link'
import { IoMdPersonAdd } from 'react-icons/io'

const SearchList = ({
  isOpen,
  searchData,
}: {
  isOpen: boolean
  searchData: User['user'][]
}) => {
  const scope = useMenuAnimation(isOpen)

  return (
    <nav className='menu' ref={scope}>
      <ul
        className='bg-white text-black p-2 flex flex-col gap-2 w-screen md:w-72 absolute md:right-4 -right-[2px] top-12 text-center'
        style={{
          pointerEvents: isOpen ? 'auto' : 'none',
          clipPath: 'inset(10% 50% 90% 50% round 10px)',
        }}
      >
        <li className='hidden'></li>
        {searchData?.map((user: User['user']) => (
          <li key={user?._id}>
            <Link
              href='/'
              className='flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800'
            >
              <div className='flex items-center justify-between px-2 py-3'>
                <div className='flex gap-2 items-center'>
                  <img
                    className='object-cover w-10 h-10 rounded-full'
                    alt='User avatar'
                    src='https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200'
                  />
                  <div className='mx-3'>
                    <div>{user?.username}</div>
                  </div>
                </div>
                <IoMdPersonAdd />
              </div>
            </Link>
          </li>
        ))}
      </ul>{' '}
    </nav>
  )
}
export default SearchList
