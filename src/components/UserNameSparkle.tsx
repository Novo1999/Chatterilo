import { SparklesCore } from './ui/sparkles'

const UserNameSparkle = () => {
  return (
    <div className='w-[10rem] relative'>
      {/* Core component */}
      <SparklesCore
        background='transparent'
        minSize={0.7}
        maxSize={1}
        particleDensity={1000}
        className='w-full h-4'
        particleColor='#FFFFFF'
      />

      {/* Radial Gradient to prevent sharp edges */}
      <div className='absolute inset-0 w-full h-full bg-[#23262e] [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]'></div>
    </div>
  )
}
export default UserNameSparkle
