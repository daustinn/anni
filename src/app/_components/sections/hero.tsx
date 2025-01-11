import React from 'react'
import RenderToast from '../render-toast'
import CopyButton from '../copy'
import { cn } from '@nanui/utils'
import { Sarina, Fredoka } from 'next/font/google'

const f = Sarina({
  subsets: ['latin'],
  weight: ['400']
})

const f2 = Fredoka({
  subsets: ['latin'],
  weight: ['300', '300', '400', '500', '600', '700']
})

export default function Hero() {
  return (
    <header
      className={cn(
        'min-h-svh py-10 bg-[#f1fff2] relative flex flex-col items-center justify-center ',
        f2.className
      )}
    >
      <span
        style={{
          backgroundImage: 'url(/noise.png)'
        }}
        className="absolute pointer-events-none z-20 inset-0"
      />
      <h1
        aria-label="Anni"
        role="heading"
        className={cn(
          'text-2xl mx-auto text-[#82b878] text-center max-w-[10ch] animate-slide-in-top pb-10',
          f.className
        )}
      >
        Anni
      </h1>
      <h2 className="md:text-6xl text-4xl font-bold max-w-2xl tracking-tight text-lime-950 mx-auto text-center animate-slide-in-top pb-3">
        <span className="opacity-50">{'“ '}</span>
        Simple and easy-to-use notification system for React with Tailwind CSS.
        <span className="opacity-50">{'”  '}</span>
      </h2>
      <div className="flex flex-col items-center pt-10">
        <RenderToast />
        <div className="relative w-[250px] shadow-md bg-white flex flex-col overflow-hidden border-2 text-lime-950 border-black p-2 pl-4 pr-2 rounded-2xl font-semibold">
          <p className="text-xs opacity-70 text-violet-950">Get started now</p>
          <div className="flex">
            <code>npm install anni</code>
            <CopyButton codeBlock={'npm install anni'} />
          </div>
        </div>
      </div>
      <footer className="absolute bottom-0 inset-x-0 p-4 pointer-events-none flex justify-center">
        <a
          href="#get-started"
          className="animate-bounce pointer-events-auto text-lg"
        >
          👇
        </a>
      </footer>
    </header>
  )
}
