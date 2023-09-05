import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

import './globals.css'

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
        <body className={font.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
