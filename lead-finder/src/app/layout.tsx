import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/context/AuthContext'
import { ToastProvider } from '@/components/Toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SmartLeadTool - Find Businesses Without Websites',
  description: 'Find high-quality business leads worldwide. Discover businesses without websites and grow your web development business.',
  keywords: 'lead generation, business leads, web development, find clients, businesses without websites',
  authors: [{ name: 'SmartLeadTool' }],
  icons: {
    icon: '/logo.svg',
  },
  openGraph: {
    title: 'SmartLeadTool - Find Businesses Without Websites',
    description: 'Discover local businesses without websites in any city worldwide. Get real phone numbers and custom pitches.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ToastProvider>
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#000000',
                  color: '#fff',
                  borderRadius: '12px',
                },
                success: {
                  iconTheme: {
                    primary: '#FBBF24',
                    secondary: '#000',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#EF4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
            {children}
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
