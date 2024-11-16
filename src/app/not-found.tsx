import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BoxReveal } from '@/components/ui/box-reveal'
import colors from '@/lib/custom-colors'

export default function NotFound() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-navy'>
      <div className='container mx-auto px-4 text-center space-y-8'>
        <BoxReveal boxColor={colors.primary.DEFAULT} duration={0.9}>
          <h1 className='text-6xl sm:text-8xl font-bold text-primary'>404</h1>
        </BoxReveal>

        <BoxReveal boxColor={colors.primary.DEFAULT} duration={1.2}>
          <h2 className='text-2xl sm:text-3xl font-heading font-bold text-white'>Page Not Found</h2>
        </BoxReveal>

        <BoxReveal boxColor={colors.primary.DEFAULT} duration={1.5}>
          <p className='text-lg text-muted max-w-md mx-auto text-start'>
            The page you're looking for doesn't exist or has been moved. Please check the URL or
            return to the homepage.
          </p>
        </BoxReveal>

        <BoxReveal boxColor={colors.primary.DEFAULT} duration={1.8}>
          <Button asChild size='lg' className='mt-8'>
            <Link href='/'>Return Home</Link>
          </Button>
        </BoxReveal>
      </div>
    </div>
  )
}
