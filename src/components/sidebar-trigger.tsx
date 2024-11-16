'use client'

import { useSidebar } from '@/components/ui/sidebar'
import { Button } from './ui/button'
import { MenuIcon } from 'lucide-react'

export function CustomTrigger() {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      onClick={toggleSidebar}
      variant='outline'
      className='mb-4 rounded-[8px] bg-primary hover:bg-primary/80 transition-colors duration-300'>
      <MenuIcon className='w-4 h-4 text-black hover:text-black/80 transition-colors duration-300' />
    </Button>
  )
}
