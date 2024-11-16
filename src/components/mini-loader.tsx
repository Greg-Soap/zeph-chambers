import Spinner from './ui/spinner'

export default function MiniLoader({
  size = 'average',
  color = '#facc15',
}: {
  size?: 'small' | 'average' | 'huge'
  color?: string
}) {
  return (
    <div className='flex justify-center items-center w-full h-full'>
      <Spinner size={size} color={color} />
    </div>
  )
}
