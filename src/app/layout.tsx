/* eslint-disable react/react-in-jsx-scope */
import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'anni'
import { GeistSans } from 'geist/font/sans'
import { Fredoka } from 'next/font/google'
import UiProvider from '@/providers/ui'

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['300', '300', '400', '500', '600', '700']
})

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
    'Simple easy-to-use notification system for React with Tailwind CSS.',
  openGraph: {
    type: 'website',
    title: 'Anni',
    description:
      'Simple easy-to-use notification system for React with Tailwind CSS.',
    images: {
      hash: 'og-image-home',
      host: 'https://anni.daustinn.com',
      pathname: '/favicon.webp',
      hostname: 'anni.daustinn.com',
      href: 'https://anni.daustinn.com/favicon.svg',
      origin: 'https://anni.daustinn.com',
      protocol: 'https',
      searchParams: new URLSearchParams(),
      url: 'https://anni.daustinn.com/favicon.svg',
      alt: 'Anni',
      height: 630,
      secureUrl: 'https://anni.daustinn.com/favicon.svg',
      type: 'image/svg',
      width: 630
    }
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased selection:bg-lime-400 selection:text-black min-h-svh bg-[#151ec1] text-white ${GeistSans.className}`}
      >
        <UiProvider>
          <Toaster
            defaultClassNames={{
              container: fredoka.className
            }}
          />
          {children}
        </UiProvider>
      </body>
    </html>
  )
}
