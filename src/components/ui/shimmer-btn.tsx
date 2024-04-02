'use client'
import { motion } from 'framer-motion'
import React from 'react'

const ShimmerBtn = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      className='inline-flex h-[43px] w-[40px] animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] font-medium text-slate-400 transition-colors'
    >
      {children}
    </motion.button>
  )
}
export default ShimmerBtn
