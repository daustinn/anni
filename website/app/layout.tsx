import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { UiProviders } from './providers'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

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
    <html lang="en">
      <UiProviders>
        <body
          className={`${geistSans.variable} antialiased bg-oasis-50 grow w-full text-brown-700 flex gap-5 flex-col`}
        >
          {children}
        </body>
      </UiProviders>
    </html>
  )
}
