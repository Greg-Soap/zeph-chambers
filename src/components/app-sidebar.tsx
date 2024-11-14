'use client'
import { Handshake, LogOut } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Box2, UserOctagon } from 'iconsax-react'
import { useMutation } from '@tanstack/react-query'
import zephService from '@/services/zeph.service'
import { useRouter } from 'next/navigation'
import { removeToken } from '@/lib/cookies'
import { toast } from 'sonner'

// Menu items.
const items = [
  {
    title: 'Agreements',
    icon: <Handshake size={24} />,
    url: '/dashboard/agreements',
  },
  {
    title: 'Litigations',
    icon: <Box2 size={24} variant='Bold' color='black' />,
    url: '/dashboard/litigations',
  },
  {
    title: 'Incorporation',
    icon: <UserOctagon size={24} variant='Bold' color='black' />,
    url: '/dashboard/incorporation',
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { mutate: logout } = useMutation({
    mutationFn: () => zephService.logout(),
    onSuccess: (data) => {
      removeToken()
      toast.success(data.data.message || 'Logged out successfully')
      router.push('/login')
    },
  })

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className='p-4 rounded-[8px] bg-primary'>
            <img src='/assets/logo.svg' alt='logohere' className='w-[120px] h-[120px] mx-auto' />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className='flex flex-col justify-between h-full'>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className='py-3 h-full'>
                    <Link href={item.url} className='flex items-center gap-2 text-xl mb-2 h-full'>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className='py-3 h-full text-xl' onClick={() => logout()}>
                  <LogOut size={24} />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
