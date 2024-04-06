'use client'
import { AuthBtn } from '@/components/Button'
import FormRow from '@/components/Form/FormRow'
import LottiePlayer from '@/components/misc/LottiePlayer'
import { Form } from '@/components/ui/form'
import useSignUp from '@/hooks/api/useSignUp'
import { signUpFormFields } from '@/utils/constants'
import validateEmail from '@/utils/validateEmail'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Username must be at least 2 characters' })
    .max(20, { message: 'Username cannot be more than 20 characters' }),
  email: z
    .string()
    .min(1, { message: 'Email cannot be empty' })
    .refine((value) => validateEmail(value), { message: 'Invalid Email' }),
  password: z
    .string()
    .min(2, { message: 'Password must be at least 2 characters' })
    .max(30, { message: 'Password cannot be more than 30 characters' }),
})

const SignUpPage = () => {
  const { mutate, isPending } = useSignUp()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  })

  // submit function
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values, {
      onSuccess: () => form.reset(),
      onError: (error) => {
        if (error instanceof AxiosError) {
          form.setError('root', {
            type: 'custom',
            message: error?.response?.data?.msg,
          })
        }
      },
    })
  }

  // set gradient based on error
  const hasError = Object.keys(form?.formState?.errors).length > 0
  const gradientColor = hasError ? 'red' : 'blue'

  return (
    <main className='flex justify-center flex-col items-center min-h-[100vh] bg-gradient-to-r from-teal-400 to-blue-600'>
      <Form {...form}>
        <motion.form
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 border p-6 bg-gradient-to-r flex flex-col md:flex-row from-indigo-200 to-yellow-100 rounded-md shadow-md'
        >
          <div>
            <p className='text-center text-2xl min-[425px]:text-4xl text-slate-500 font-caveat'>
              Chatterilo
            </p>
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <LottiePlayer
                url='https://lottie.host/04e0fdb3-5fb1-4fce-a3ab-f67dfdbd72ec/n1rlN63g4z.json'
                className='size-48 min-[375px]:size-60'
              />
            </motion.div>
          </div>
          <div className='flex flex-col gap-3'>
            {/* fields */}
            {signUpFormFields.map((field) => (
              <FormRow
                key={field}
                form={form}
                gradientColor={gradientColor}
                name={field}
              />
            ))}
            {/* error from response */}
            {form.formState.errors?.root?.message && (
              <p className='text-red-500 text-sm'>
                {form.formState.errors?.root?.message}
              </p>
            )}
            <AuthBtn
              isPending={isPending}
              className={{
                isPending: {
                  isPendingFalse: 'bg-teal-400',
                  isPendingTrue: 'bg-gray-400',
                },
                general: 'hover:bg-teal-500',
              }}
            >
              Sign up
            </AuthBtn>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
              whileTap={{ y: -3 }}
              className='flex-center'
            >
              <Link
                className='text-blue-400 text-xs underline underline-offset-4'
                href='/login'
              >
                Already have an account? Log in
              </Link>
            </motion.div>
          </div>
        </motion.form>
      </Form>
    </main>
  )
}
export default SignUpPage
