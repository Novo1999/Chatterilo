import customFetch from '@/utils/customFetch'
import { useQuery } from '@tanstack/react-query'

const getUser = async (id: string) => {
  try {
    const data = await customFetch.get(`/user/users/${id}`)
    return data
  } catch (error) {
    throw error
  }
}

const useGetUser = (id: string) =>
  useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id),
    enabled: !!id,
  })

export default useGetUser
