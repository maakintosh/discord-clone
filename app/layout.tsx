import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

import { cn } from '@/lib/utils'
import { ModalProvider } from '@/components/providers/modal-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'

import './globals.css'

import { QueryProvider } from '@/components/providers/query-provider'
import { SocketProvider } from '@/components/providers/socket-provider'
import { ToastProvider } from '@/components/providers/toast-provider'

const font = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ChatApp',
  description:
    'discord-like chat app built with Next13, shadcn-UI, Clerk, Prisma, Socket.io, react-query etc.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body className={cn(font.className, 'bg-gray-300 dark:bg-gray-700')}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            storageKey="discord-clone-theme"
          >
            <SocketProvider>
              <QueryProvider>
                {children}
                <ModalProvider />
                <ToastProvider />
              </QueryProvider>
            </SocketProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
