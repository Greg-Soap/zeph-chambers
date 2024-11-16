'use client'

import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function PageHeader({ title, description }: { title: string; description: string }) {
  const router = useRouter()

  return (
    <div className='mb-6'>
      <Button
        onClick={() => router.back()}
        variant='ghost'
        className='mb-4 flex items-center text-sm hover:bg-primary'>
        <ChevronLeft className='mr-2 h-4 w-4' />
        Back
      </Button>
      <h1 className='text-2xl font-bold tracking-tight'>{title}</h1>
      <p className='text-muted-foreground'>{description}</p>
    </div>
  )
}
