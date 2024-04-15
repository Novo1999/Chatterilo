import customFetch from '@/utils/customFetch'
import { useQuery } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'

const getCurrentUser = async () => {
  try {
    const data = await customFetch.get('/auth/current-user')
    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}
export const useGetCurrentUser = () => {
  const pathname = usePathname()

  const query = useQuery({
    queryKey: ['current-user'],
    queryFn: getCurrentUser,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: true,
    // refetchInterval: 5000,
    enabled: pathname !== '/login' && pathname !== '/signup',
  })
  return query
}
