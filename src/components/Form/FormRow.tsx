import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { getValueOfX } from '@/utils/misc/getValueofX'
import { motion } from 'framer-motion'

interface FormRowProps {
  form: any
  gradientColor: string
  name: string
  type: string
}

const FormRow = ({ form, gradientColor, name, type }: FormRowProps) => {
  const x = getValueOfX(name)

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className='space-y-0'>
          <FormControl>
            <motion.div
              initial={{ x, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Input
                gradient={gradientColor}
                className='bg-cyan-500 text-white w-full shadow-md md:w-72'
                placeholder={name[0].toUpperCase() + name.slice(1)}
                type={type}
                {...field}
              />
            </motion.div>
          </FormControl>
          <FormMessage className='text-xs' />
        </FormItem>
      )}
    />
  )
}
export default FormRow
