'use client'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import validateEmail from '@/utils/validateEmail'
import { zodResolver } from '@hookform/resolvers/zod'
import { Player } from '@lottiefiles/react-lottie-player'
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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }
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
              <Player
                autoplay
                loop
                src='https://lottie.host/04e0fdb3-5fb1-4fce-a3ab-f67dfdbd72ec/n1rlN63g4z.json'
                className='size-48 min-[375px]:size-60'
              />
            </motion.div>
          </div>
          <div className='flex flex-col gap-3'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem className='space-y-0'>
                  <FormControl>
                    <motion.div
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Input
                        gradient='red'
                        className='bg-cyan-500 text-white w-full shadow-md md:w-72'
                        placeholder='Username'
                        type='text'
                        {...field}
                      />
                    </motion.div>
                  </FormControl>
                  <FormMessage className='text-xs' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='space-y-0'>
                  <FormControl>
                    <motion.div
                      initial={{ x: 30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Input
                        gradient='red'
                        className='bg-cyan-500 text-white shadow-md md:w-72'
                        placeholder='Email'
                        type='text'
                        {...field}
                      />
                    </motion.div>
                  </FormControl>
                  <FormMessage className='text-xs' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='space-y-0'>
                  <FormControl>
                    <motion.div
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Input
                        gradient='red'
                        className='bg-cyan-500 text-white shadow-md md:w-72'
                        placeholder='Password'
                        type='text'
                        {...field}
                      />
                    </motion.div>
                  </FormControl>
                  <FormMessage className='text-xs' />
                </FormItem>
              )}
            />
            <div className='flex-center'>
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                whileTap={{ scale: 0.8 }}
                transition={{ delay: 0.3 }}
                className='bg-teal-400 text-white p-2 rounded-md shadow-md mb-4'
                type='submit'
              >
                Sign Up
              </motion.button>
            </div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              whileTap={{ y: -3 }}
              transition={{ delay: 0.3 }}
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
