import customFetch from '@/utils/customFetch'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

export const signUp = async (values: IAuthInput) => {
  try {
    const data = await customFetch.post('/auth/signup', values)
    return data
  } catch (error) {
    throw error
  }
}

export const useSignUp = () => {
  let toastPromise
  const mutation = useMutation({
    mutationFn: (values: IAuthInput) => {
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
