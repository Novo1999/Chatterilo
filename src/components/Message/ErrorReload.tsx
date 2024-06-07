'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'

const ErrorReload = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const searchParams = useSearchParams()

  const conversationId = searchParams.get('id')

  const reload = () =>
    queryClient.refetchQueries({
      queryKey: ['conversation', conversationId],
    })

  const goBack = () => router.replace('/')

  return (
    <div className='flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto'>
      <button className='flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='w-5 h-5 rtl:rotate-180'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18'
          />
        </svg>
        <span onClick={goBack}>Go back</span>
      </button>
      <button
        onClick={reload}
        className='w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600'
      >
        Reload
      </button>
    </div>
  )
}
export default ErrorReload
