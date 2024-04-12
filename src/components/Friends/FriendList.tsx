import useGetFriendsList from '@/hooks/api/useGetFriendsList'
import useAuthContext from '@/hooks/contextHooks/useAuthContext'
import useMenuAnimation from '@/hooks/useMenuAnimation'
import { Loader, MessageCircle, Trash } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'

const FriendList = ({ isOpen }: { isOpen: boolean }) => {
  const scope = useMenuAnimation(isOpen)
  let { user: { friends } = {} } = useAuthContext()
  friends = useGetFriendsList(friends, isOpen)

  return (
    <nav className='menu font-poppins w-full' ref={scope}>
      <ul
        className='bg-white max-h-60 overflow-y-scroll search-menu text-black p-2 flex flex-col gap-2 w-screen md:w-96 text-sm absolute md:-left-20 -right-[2px] top-12 text-center'
        style={{
          pointerEvents: isOpen ? 'auto' : 'none',
          clipPath: 'inset(10% 50% 90% 50% round 10px)',
        }}
      >
        <div className='p-bold-20'>My Friends</div>
        <li className='hidden'></li>
        {friends?.length > 0 &&
          friends?.map((friend) =>
            friend.isLoading ? (
              <div
                className='flex-center'
                key={friend?.data?._id ?? crypto.randomUUID()}
              >
                <Loader className='animate-spin' />
              </div>
            ) : (
              <li key={friend?.data?._id ?? crypto.randomUUID()}>
                <Link
                  href='/'
                  className='flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800'
                >
                  <div className='flex items-center justify-between px-2 py-3 w-full'>
                    <div className='flex gap-2 items-center'>
                      <img
                        className='object-cover w-10 h-10 rounded-full'
                        alt='User avatar'
                        src='https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200'
                      />
                      <div className='mx-3'>
                        <div>{friend?.data?.username}</div>
                      </div>
                    </div>
                    <div className='flex gap-2'>
                      {/* message friend */}
                      <Button
                        variant='ghost'
                        className='text-xl px-2 bg-green-400 hover:bg-green-500'
                      >
                        <MessageCircle />
                      </Button>
                      {/* decline friend request */}
                      <Button className='text-xl px-2 bg-red-400 hover:bg-red-500'>
                        <Trash />
                      </Button>
                    </div>
                  </div>
                </Link>
              </li>
            )
          )}
      </ul>{' '}
    </nav>
  )
}
export default FriendList
