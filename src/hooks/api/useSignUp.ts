import { BASE_URL } from '@/utils/constants'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-hot-toast'

interface values {
  email: string
  username: string
  password: string
}

export const signUp = async (values: values) => {
  try {
    const data = await axios.post(`${BASE_URL}/signup`, values)
    return data
  } catch (error) {
    throw error
  }
}

export const useSignUp = () => {
  let toastPromise
  const mutation = useMutation({
    mutationFn: (values: values) => {
      toastPromise = signUp(values)
      // show loading, success message and error message
      toast.promise(toastPromise, {
        loading: 'Loading',
        success: 'Signed Up Successfully',
        error: (err) => `Error signing up: ${err?.response?.data?.msg}`,
      })
      return toastPromise
    },
  })

  return mutation
}

export default useSignUp
