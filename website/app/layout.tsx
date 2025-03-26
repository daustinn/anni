import type { Metadata } from 'next'
import './globals.css'
import { UiProviders } from './providers'
import { GeistSans } from 'geist/font/sans'

export const metadata: Metadata = {
  title: 'Anni - Simple and easy-to-use notification system for React.',
  description: 'Simple easy-to-use notification system for React.',
  icons: 'anni.svg',
  keywords: 'React, Notification, Toast, Anni',
  authors: {
    name: 'Daustinn',
    url: 'https://daustinn.com'
  },
  category: 'UI Components'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <UiProviders>
        <body
          suppressHydrationWarning
          className={`${GeistSans.className} antialiased bg-oasis-50 grow w-full text-brown-700 flex gap-5 flex-col`}
        >
          {children}
        </body>
      </UiProviders>
    </html>
  )
}
