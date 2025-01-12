import React from 'react'
import Hero from './_components/sections/hero'
import Footer from './_components/footer'
import Docs from './_components/sections/docs'
import { Sarina, Fredoka } from 'next/font/google'
import { DownArrowOdulated } from '@/icons/indext'

const sarina = Sarina({
  subsets: ['latin'],
  weight: ['400']
})

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['300', '300', '400', '500', '600', '700']
})

export default function Home() {
  return (
    <main className="w-full flex flex-col mx-auto">
      <Hero fredoka={fredoka} sarina={sarina} />
      <div className="h-svh hidden md:block"></div>
      <div className="flex relative flex-col py-5 bg-[#161616] rounded-t-3xl z-[1]">
        <footer className="hidden absolute md:flex text-blue-100 top-[-200px] inset-x-0 p-10 px-0 pointer-events-none justify-end">
          <a href="#get-started" className="pointer-events-auto text-lg">
            <DownArrowOdulated size={110} />
          </a>
        </footer>
        <Docs />
        <Footer />
      </div>
    </main>
  )
}
