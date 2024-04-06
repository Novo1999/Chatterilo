import { motion } from 'framer-motion'

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
        {children}
      </motion.button>
    </div>
  )
}
