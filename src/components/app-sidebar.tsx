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
import { Box2, Crown1, UserOctagon } from 'iconsax-react'
import { useMutation } from '@tanstack/react-query'
import zephService from '@/services/zeph.service'
import { useRouter } from 'next/navigation'
import { removeToken } from '@/lib/cookies'
import { toast } from 'sonner'
import { Badge } from './ui/badge'
import { useAppStore } from '@/store/use-app-store'

// Menu items.
const items = [
  {
    title: 'Agreements',
    icon: <Handshake size={32} className='w-[32px] h-[32px] text-white' />,
    url: '/dashboard/agreements',
  },
  {
    title: 'Litigations',
    icon: <Box2 size={32} variant='Bold' color='white' className='w-[32px] h-[32px] text-white' />,
    url: '/dashboard/litigations',
  },
  {
    title: 'Incorporation',
    icon: (
      <UserOctagon
        size={32}
        variant='Bold'
        color='white'
        className='w-[32px] h-[32px] text-white'
      />
    ),
    url: '/dashboard/incorporation',
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, isAdmin } = useAppStore()
  const { mutate: logout } = useMutation({
    mutationFn: () => zephService.logout(),
    onSuccess: (data) => {
      removeToken()
      toast.success(data.data.message || 'Logged out successfully')
      router.push('/auth/login')
    },
  })

  return (
    <Sidebar className='bg-[#151921]'>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className='p-4  border-b'>
            <div className='flex items-center gap-3'>
              <div className='flex flex-col'>
                <div className='flex items-center gap-2 flex-wrap'>
                  <span className='font-medium'>{user?.fullName}</span>
                  {isAdmin && (
                    <Badge variant='secondary' className='flex items-center gap-1 bg-primary'>
                      <Crown1 size={14} color='black' />
                      Admin
                    </Badge>
                  )}
                </div>
                <span className='text-sm text-white/50 mt-1'>{user?.email}</span>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className='flex flex-col justify-between h-full'>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className='py-2'>
                  <SidebarMenuButton
                    onClick={() => router.push(item.url)}
                    isActive={pathname === item.url}
                    className='py-3 h-full data-[active=true]:bg-primary hover:bg-primary/80 transition-colors duration-300'>
                    <Link href={item.url} className='flex items-center gap-2 text-xl h-full'>
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
                <SidebarMenuButton
                  className='py-3 h-full text-xl hover:bg-primary/80 transition-colors duration-300'
                  onClick={() => logout()}>
                  <LogOut size={32} />
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
