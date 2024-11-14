'use client'
import { Handshake, LogOut } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Box2, UserOctagon } from 'iconsax-react'

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

  return (
    <Sidebar>
      <SidebarContent className='flex flex-col justify-between h-full'>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
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
                <SidebarMenuButton>
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
