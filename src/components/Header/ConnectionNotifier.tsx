import { Badge } from '@/components/ui/badge'
import useSocket from '@/hooks/useSocket'

const ConnectionNotifier = () => {
  const { isConnected } = useSocket()

  return (
    <Badge
      variant='secondary'
      className={`${
        isConnected
          ? 'bg-[#54C6EB] hover:bg-[#54C6EB]'
          : 'bg-red-400 hover:bg-red-400'
      } cursor-default shadow-md`}
    >
      {isConnected ? 'Connected' : 'Disconnected'}
    </Badge>
  )
}
export default ConnectionNotifier
