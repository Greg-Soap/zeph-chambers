import { AppSidebar } from '@/components/app-sidebar'
import { CustomTrigger } from '@/components/sidebar-trigger'
import { SidebarProvider } from '@/components/ui/sidebar'
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
      <div className='flex min-h-screen w-full bg-[#1E2330]'>
        <AppSidebar />
        <main className='flex-1 overflow-x-hidden bg-[#1E2330]'>
          <div className='container mx-auto px-4 py-6'>
            <CustomTrigger />
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
