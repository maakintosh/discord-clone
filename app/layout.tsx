import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

import { ThemeProvider } from '@/components/providers/theme-provider'

import './globals.css'

import { cn } from '@/lib/utils'

const font = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'discord-clone',
  description:
    'discord-clone built with Next13, shadcn-UI, Clerk, Prisma, Socket.io, react-query etc.',
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
        <body className={cn(font.className, 'bg-white dark:bg-gray-800')}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            storageKey="discord-clone-theme"
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
