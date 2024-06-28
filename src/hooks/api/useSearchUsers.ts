import customFetch from '@/utils/misc/customFetch'
import { useQuery } from '@tanstack/react-query'

const searchUser = async (value: string) => {
  try {
    const data = await customFetch.get(`/user?q=${value}`)
    return data
  } catch (error) {
    throw error
  }
}

const useSearchUsers = (searchInput: string) => {
  const query = useQuery({
    queryKey: ['search', searchInput],
    queryFn: () => searchUser(searchInput),
  })
  return query
}
export default useSearchUsers
