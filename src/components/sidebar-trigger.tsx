'use client'

import { useSidebar } from '@/components/ui/sidebar'
import { Button } from './ui/button'
import { MenuIcon } from 'lucide-react'

export function CustomTrigger() {
  const { toggleSidebar } = useSidebar()

  return (
    <Button onClick={toggleSidebar} variant='outline' className='mb-4 rounded-[8px]'>
      <MenuIcon className='w-4 h-4' />
    </Button>
  )
}
