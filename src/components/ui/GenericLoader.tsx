import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

const GenericLoader = ({ className }: { className?: string }) => {
  return (
    <div>
      <Loader2 className={`animate-spin text-white ${cn(className)}`} />
    </div>
  )
}
export default GenericLoader
