'use client'

import React from 'react'

import RenderToast from './render-toast'
import { NextFont } from 'next/dist/compiled/@next/font'
import { toast } from 'anni'
import { cn } from '@nanui/utils'
import { Copy } from './icons'

export default function Hero({ fredoka }: { fredoka: NextFont }) {
  const handleCopy = () => {
    navigator.clipboard.writeText('npm install anni')
    toast('The command has been copied to the clipboard', {
      media: '📋'
    })
  }

  return (
    <section
      className={cn(
        'bg-gradient-to-b from-oasis-200 via-oasis-100 to-oasis-50 grow grid place-content-center data-[inaside]:flex-none py-28 relative',
        fredoka.className
      )}
    >
      <div className="flex pb-10 justify-center">
        <h1
          aria-label="Anni"
          role="heading"
          className="text-4xl text-brown-800 px-2 p-1 pt-px rounded-xl bg-[#e3ac52] mx-auto text-center font-bold tracking-tight animate-slide-in-top"
        >
          anni
        </h1>
      </div>
      <h2 className="md:text-7xl text-5xl font-bold max-w-3xl tracking-tight text-brown-800 mx-auto text-center animate-slide-in-top pb-3">
        <span className="opacity-50">{'“ '}</span>
        Simple,{' '}
        <span className="bg-oasis-800 rounded-xl px-4 inline-block text-oasis-100">
          beautiful
        </span>
        , and
        <span className="bg-[#e3ac52] mt-2 rounded-xl px-4 inline-block">
          easy-to-use
        </span>
        notification system
        <span className="opacity-50">{' ”'}</span>
      </h2>
      <div className="flex flex-col items-center pt-10">
        <RenderToast />
        <div className="relative w-[250px] bg-oasis-50 flex shadow-md shadow-brown-700/30 flex-col overflow-hidden text-brown-800 p-2.5 pl-4 pr-2 rounded-2xl font-semibold">
          <p className="text-xs text-brown-600">Get started now</p>
          <div className="flex">
            <div>bun add anni</div>
            <button
              onClick={handleCopy}
              title="Copy to clipboard"
              className="flex relative z-20 hover:scale-110 transition-transform ml-auto items-center justify-center"
            >
              <Copy />
            </button>
          </div>
        </div>
        <div className="py-4">
          <a
            href="https://github.com/daustinn/anni"
            target="_blank"
            rel="noreferrer"
            className="block text-sm font-medium font-sans underline"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
