import React from 'react'
import RenderToast from '../render-toast'
import { cn } from '@nanui/utils'
import { NextFont } from 'next/dist/compiled/@next/font'
import { toast } from 'anni'
import { Copy, DownArrowOdulated } from '@/icons'
import { UiContext } from '@/providers/ui'

export default function Hero({
  sarina,
  fredoka
}: {
  sarina: NextFont

  fredoka: NextFont
}) {
  const handleCopy = () => {
    navigator.clipboard.writeText('npm install anni')
    toast.success('Code copied to clipboard 🗒️')
  }
  const ctxui = React.useContext(UiContext)
  return (
    <header
      data-inaside={ctxui.openExamples ? '' : undefined}
      className={cn(
        'min-h-svh grid flex-grow xl:w-max data-[inaside]:flex-none transition-[width] max-md:py-10 data-[inaside]:w-[60vw] max-xl:data-[inaside]:w-svw place-content-center relative inset-x-0 z-0',
        fredoka.className
      )}
    >
      <span
        style={{
          backgroundImage: 'url(/noise.png)'
        }}
        className="fixed opacity-90 pointer-events-none z-20 inset-0"
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
        Simple and <span className="bg-lime-400 text-black">
          easy-to-use
        </span>{' '}
        notification system for React with Tailwind CSS
        <span className="opacity-50">{' ”'}</span>
      </h2>
      <div className="flex flex-col items-center pt-10">
        <RenderToast />
        <div className="relative w-[250px] bg-lime-100 flex shadow-[0_0_15px_rgba(26,46,5,.3)] flex-col overflow-hidden text-lime-950 border-black p-2.5 pl-4 pr-2 rounded-2xl font-semibold">
          <p className="text-xs opacity-70 text-lime-950">Get started now</p>
          <div className="flex">
            <code>npm install anni</code>
            <button
              onClick={handleCopy}
              title="Copy to clipboard"
              className="flex z-[1] hover:scale-110 transition-transform ml-auto pl-2 items-center justify-center"
            >
              <Copy />
            </button>
          </div>
        </div>
        <div className="pt-2">
          <button
            onClick={ctxui.setOpenExamples.bind(null, !ctxui.openExamples)}
            className="py-3 font-medium hover:scale-105 transition-transform"
          >
            {ctxui.openExamples ? 'Close examples 👀' : 'View examples 📖'}
          </button>
        </div>
      </div>
      <div className="hidden absolute md:flex text-blue-100 inset-x-0 px-10 pointer-events-none bottom-0 justify-end items-end">
        <button
          data-open={ctxui.openExamples ? '' : undefined}
          onClick={ctxui.setOpenExamples.bind(null, !ctxui.openExamples)}
          className="pointer-events-auto text-lg data-[open]:-rotate-180"
        >
          <DownArrowOdulated size={110} className="-rotate-90" />
        </button>
      </div>
    </header>
  )
}
