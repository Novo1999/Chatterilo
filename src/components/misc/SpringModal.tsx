import { AnimatePresence, motion } from 'framer-motion'
import { Dispatch, SetStateAction } from 'react'
import { FiAlertCircle } from 'react-icons/fi'

const SpringModal = ({
  modalOpen,
  setModalOpen,
  message,
  onClick,
}: {
  modalOpen: boolean
  setModalOpen: Dispatch<SetStateAction<boolean>>
  message?: string
  onClick?: () => void
}) => {
  const handleClick = () => {
    setModalOpen(false)
    onClick?.()
  }

  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setModalOpen(false)}
          className='bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer'
        >
          <motion.div
            initial={{ scale: 0, rotate: '42.5deg' }}
            animate={{ scale: 1, rotate: '0deg' }}
            exit={{ scale: 0, rotate: '0deg' }}
            onClick={(e) => e.stopPropagation()}
            className='bg-gradient-to-r from-red-400 to-red-900 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden'
          >
            <FiAlertCircle className='text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24' />
            <div className='relative z-10'>
              <div className='bg-white w-16 h-16 mb-2 rounded-full text-3xl text-red-600 grid place-items-center mx-auto'>
                <FiAlertCircle />
              </div>
              <h3 className='text-3xl font-bold text-center mb-2'>{message}</h3>
              <div className='flex gap-2'>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  onClick={() => setModalOpen(false)}
                  className='bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded'
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  onClick={handleClick}
                  className='bg-white hover:opacity-90 transition-opacity text-red-600 font-semibold w-full py-2 rounded'
                >
                  Absolutely
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SpringModal
