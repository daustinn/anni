/* eslint-disable react/react-in-jsx-scope */
import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'anni'

export const metadata: Metadata = {
  title:
    'Anni - Simple and easy-to-use notification system for React with Tailwind CSS.',
  description:
    'Simple easy-to-use notification system for React with Tailwind CSS.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`antialiased min-h-svh bg-[#161616] text-white`}>
        <Toaster />
        {children}
      </body>
    </html>
  )
}
