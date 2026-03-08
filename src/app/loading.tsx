import { Spinner } from '@/components/ui/spinner'
import { WEBSITE_NAME } from '@/lib/constants'

const loading = () => {
  return (
    <div className='relative overflow-hidden w-full min-h-screen flex items-center justify-center text-center animate-pulse'>
      <div className="flex flex-col justify-center items-center text-center">
        <Spinner />
        <span>loading {WEBSITE_NAME}...</span>
      </div>

      <h1 className="text-9xl font-black text-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 animate-pulse select-none">
        LOOK
      </h1>
    </div>
  )
}

export default loading