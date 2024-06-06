import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import Loader from '../misc/Loader'
import { Button } from '../ui/button'

interface AuthBtnProps {
  isPending: boolean
  children: string
  className: {
    general: string
    isPending: {
      isPendingTrue: string
      isPendingFalse: string
    }
  }
}

export const AuthBtn = ({
  isPending,
  children,
  className: {
    isPending: { isPendingTrue, isPendingFalse },
    general,
  },
}: AuthBtnProps) => {
  return (
    <div className='flex-center'>
      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
        whileTap={{ scale: 0.8 }}
        className={`${
          isPending ? isPendingTrue : isPendingFalse
        } text-white p-2 rounded-md shadow-md mb-4 transition-colors duration-300 ${general}`}
        type='submit'
        disabled={isPending}
      >
        {isPending ? <Loader /> : children}
      </motion.button>
    </div>
  )
}

export const CloseButton = ({
  children,
  onClick,
  className,
}: {
  children: ReactNode
  className?: string
  onClick?: () => void
}) => {
  return (
    <Button
      onClick={onClick}
      className={`w-fit ${cn(className)} cursor-pointer`}
      asChild
      variant='destructive'
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        <p className='text-xl'>{children}</p>
      </motion.div>
    </Button>
  )
}
