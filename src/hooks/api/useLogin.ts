import customFetch from '@/utils/customFetch'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

interface values {
  email: string
  password: string
}

const login = async (values: values) => {
  try {
    const data = await customFetch.post('/auth/login', values)
    return data
  } catch (error) {
    throw error
  }
}

export const useLogin = () => {
  let toastPromise
  const mutation = useMutation({
    mutationFn: (values: values) => {
      toastPromise = login(values)
      // show loading, success message and error message
      toast.promise(toastPromise, {
        loading: 'Loading',
        success: 'Logged in Successfully',
        error: (err) => `Error logging in: ${err?.response?.data?.msg}`,
      })
      return toastPromise
    },
  })

  return mutation
}

export default useLogin
