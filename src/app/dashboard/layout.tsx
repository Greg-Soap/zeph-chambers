import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard | Legal Services',
  description: 'Manage your legal services and documents',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className='flex min-h-screen w-full'>
        <AppSidebar />
        <main className='flex-1 overflow-x-hidden'>
          <div className='container mx-auto px-4 py-6'>
            <SidebarTrigger className='mb-4' />
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
