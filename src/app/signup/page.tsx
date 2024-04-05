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
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Username must be at least 2 characters' })
    .max(20, { message: 'Username cannot be more than 20 characters' }),
  email: z
    .string()
    .min(2, { message: 'Email must be at least 2 characters' })
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
    <main className='flex justify-center flex-col items-center min-h-[100vh] bg-gradient-to-r from-teal-400 to-gray-500'>
      <Form {...form}>
        <motion.form
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 border p-6 bg-gradient-to-r from-indigo-200 to-yellow-100 rounded-md'
        >
          <div>
            <p className='text-center text-2xl text-slate-500 font-poppins'>
              Chatterilo
            </p>
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Player
                autoplay
                loop
                src='https://lottie.host/4115f04c-177a-4ba5-85d7-4946b5185b4b/SfwmWWyOhX.json'
                className='size-48 min-[375px]:size-60'
              />
            </motion.div>
          </div>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem className='space-y-0'>
                <FormControl>
                  <motion.div
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                  >
                    <Input
                      gradient='red'
                      className='bg-cyan-500 text-white w-full'
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
                  >
                    <Input
                      gradient='red'
                      className='bg-cyan-500 text-white'
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
                  >
                    <Input
                      gradient='red'
                      className='bg-cyan-500 text-white'
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
              className='bg-teal-400 text-white p-2 rounded-md'
              type='submit'
            >
              Submit
            </motion.button>
          </div>
        </motion.form>
      </Form>
    </main>
  )
}
export default SignUpPage
