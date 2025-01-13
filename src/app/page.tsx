'use client'

import React from 'react'
import Hero from './_components/sections/hero'
import { Sarina, Fredoka } from 'next/font/google'
import Sections from './_components/sections'
import { UiContext } from '@/providers/ui'

const sarina = Sarina({
  subsets: ['latin'],
  weight: ['400']
})

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['300', '300', '400', '500', '600', '700']
})

export default function Home() {
  const ctxui = React.useContext(UiContext)
  return (
    <main
      data-horizontal={ctxui.openExamples ? '' : undefined}
      className="w-full flex max-md:flex-col mx-auto"
    >
      <Hero fredoka={fredoka} sarina={sarina} />
      <Sections />
    </main>
  )
}
