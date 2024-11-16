import type { Metadata, Viewport } from 'next'
import Provider from './client-provider'
import './index.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: {
    default: 'Zeph Chambers',
    template: '%s | Zeph Chambers',
  },
  description: 'Legal professional services and case management platform',
  keywords: ['legal', 'law', 'litigation', 'case management', 'legal services'],
  authors: [{ name: 'Zeph Chambers' }],
  creator: 'Zeph Chambers',
  publisher: 'Zeph Chambers',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [{ url: '/favicon.ico' }, { url: '/icon.png', type: 'image/png' }],
    apple: [{ url: '/apple-icon.png', type: 'image/png' }],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
