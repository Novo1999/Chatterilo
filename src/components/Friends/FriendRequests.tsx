import useGetFriendRequests from '@/hooks/api/useGetFriendRequests'
import useAuthContext from '@/hooks/contextHooks/useAuthContext'
import useMenuAnimation from '@/hooks/useMenuAnimation'
import Link from 'next/link'

const FriendRequests = ({ isOpen }: { isOpen: boolean }) => {
  const scope = useMenuAnimation(isOpen)
  const { user: { friendRequests } = {} } = useAuthContext()

  const results = useGetFriendRequests(
    friendRequests?.received as string[],
    isOpen
  )
  const friendRequestData = results.map((result) => ({
    userData: result.data,
    isLoading: result.isLoading,
  }))
  return (
    <nav className='menu font-poppins' ref={scope}>
      <ul
        className='bg-white max-h-60 overflow-y-scroll search-menu text-black p-2 flex flex-col gap-2 w-screen md:w-72 text-sm absolute md:-left-20 -right-[2px] top-12 text-center'
        style={{
          pointerEvents: isOpen ? 'auto' : 'none',
          clipPath: 'inset(10% 50% 90% 50% round 10px)',
        }}
      >
        <div className='p-bold-20'>Friend Requests</div>
        <li className='hidden'></li>
        {friendRequestData?.map((friend) =>
          friend.isLoading ? (
            <p>Loading...</p>
          ) : (
            <li key={friend?.userData?._id}>
              <Link
                href='/'
                className='flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800'
              >
                <div className='flex items-center justify-evenly px-2 py-3 w-full'>
                  <div className='flex gap-2 items-center'>
                    <img
                      className='object-cover w-10 h-10 rounded-full'
                      alt='User avatar'
                      src='https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200'
                    />
                    <div className='mx-3'>
                      <div>{friend?.userData?.username}</div>
                    </div>
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
export default FriendRequests
