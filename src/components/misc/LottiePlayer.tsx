import { Player } from '@lottiefiles/react-lottie-player'

interface LottiePlayerProp {
  url: string
  className: string
}

const LottiePlayer = ({ url, className }: LottiePlayerProp) => {
  return <Player autoplay loop src={url} className={className} />
}
export default LottiePlayer
