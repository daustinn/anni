import React from 'react'
import RenderToast from '../render-toast'
import CopyButton from '../copy'
import { cn } from '@nanui/utils'
import { NextFont } from 'next/dist/compiled/@next/font'

export default function Hero({
  sarina,
  fredoka
}: {
  sarina: NextFont

  fredoka: NextFont
}) {
  return (
    <header
      className={cn(
        'min-h-svh gird max-md:py-10 place-content-center md:fixed relative inset-x-0 z-0',
        fredoka.className
      )}
    >
      <span
        style={{
          backgroundImage: 'url(/noise.png)'
        }}
        className="absolute opacity-90 pointer-events-none z-20 inset-0"
      />
      <h1
        aria-label="Anni"
        role="heading"
        className={cn(
          'text-3xl mx-auto text-white/70 text-center max-w-[10ch] animate-slide-in-top pb-10',
          sarina.className
        )}
      >
        Anni
      </h1>
      <h2 className="md:text-6xl text-5xl font-bold max-w-3xl tracking-tight text-lime-100 mx-auto text-center animate-slide-in-top pb-3">
        <span className="opacity-50">{'“ '}</span>
        Simple and easy-to-use notification system for React with Tailwind CSS
        <span className="opacity-50">{' ”'}</span>
      </h2>
      <div className="flex flex-col items-center pt-10">
        <RenderToast />
        <div className="relative w-[250px] bg-lime-100 flex shadow-[0_0_15px_rgba(26,46,5,.3)] flex-col overflow-hidden text-lime-950 border-black p-2.5 pl-4 pr-2 rounded-2xl font-semibold">
          <p className="text-xs opacity-70 text-lime-950">Get started now</p>
          <div className="flex">
            <code>npm install anni</code>
            <CopyButton codeBlock={'npm install anni'} />
          </div>
        </div>
      </div>
    </header>
  )
}
