/* eslint-disable react/react-in-jsx-scope */
import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'anni'
import { GeistSans } from 'geist/font/sans'

export const metadata: Metadata = {
  title:
    'Anni - Simple and easy-to-use notification system for React with Tailwind CSS.',
  description:
    'Simple easy-to-use notification system for React with Tailwind CSS.',
  icons: 'favicon.svg',
  keywords: 'React, Tailwind CSS, Notification, Toast, Anni',
  authors: {
    name: 'Daustinn',
    url: 'https://daustinn.com'
  },
  category: 'UI Components',
  abstract:
    'Simple easy-to-use notification system for React with Tailwind CSS.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased min-h-svh bg-[#151ec1] text-white ${GeistSans.className}`}
      >
        <Toaster />
        {children}
      </body>
    </html>
  )
}
