'use client'
import { AuthBtn } from '@/components/Button'
import FormRow from '@/components/Form/FormRow'
import LottiePlayer from '@/components/misc/LottiePlayer'
import { Form } from '@/components/ui/form'
import useLogin from '@/hooks/api/useLogin'
import { loginFormFields } from '@/utils/misc/constants'
import validateEmail from '@/utils/misc/validateEmail'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email cannot be empty' })
    .refine((value) => validateEmail(value), { message: 'Invalid Email' }),
  password: z.string().min(1, { message: 'Password cannot be empty' }),
})

const LoginForm = () => {
  const { mutate, isPending } = useLogin()
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const hasError = Object.keys(form.formState.errors).length > 0
  const gradientColor = hasError ? 'red' : 'blue'

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values, {
      onSuccess: (data) => {
        if (data.data.success) {
          router.push('/')
        }
        form.reset()
      },
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

  return (
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
              url='https://lottie.host/33ab8914-168a-470f-b486-5fcd498156a2/82R0q8FBw9.json'
              className='size-32 min-[375px]:size-48'
            />
          </motion.div>
        </div>
        <div className='flex flex-col gap-3 md:pt-12'>
          {/* fields */}
          {loginFormFields.map((field) => (
            <FormRow
              type={field}
              key={field}
              form={form}
              gradientColor={gradientColor}
              name={field}
            />
          ))}
          {form.formState.errors?.root?.message && (
            <p className='text-red-500 text-sm'>
              {form.formState.errors?.root?.message}
            </p>
          )}
          <AuthBtn
            isPending={isPending}
            className={{
              isPending: {
                isPendingFalse: 'bg-blue-400',
                isPendingTrue: 'bg-gray-400',
              },
              general: 'hover:bg-blue-500',
            }}
          >
            Log in
          </AuthBtn>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
            whileTap={{ y: -3 }}
            className='flex-center'
          >
            <Link
              className='text-blue-400 text-xs underline underline-offset-4 '
              href='/signup'
            >
              No account? Sign Up Now
            </Link>
          </motion.div>
        </div>
      </motion.form>
    </Form>
  )
}
export default LoginForm
