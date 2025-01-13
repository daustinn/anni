'use client'

import React from 'react'
import Docs from './examples'
import Footer from '../footer'
import { UiContext } from '@/providers/ui'

export default function Sections() {
  const ctxui = React.useContext(UiContext)
  return (
    <div
      data-inaside={ctxui.openExamples ? '' : undefined}
      className="flex rounded-l-2xl transition-[transform,opacity] shadow-xl shadow-blue-900 translate-x-full data-[inaside]:opacity-100 data-[inaside]:translate-x-0 data-[inaside]:rounded-tr-none h-svh overflow-y-auto opacity-0 w-[90vw] sm:w-[70vw] xl:w-[40vw] fixed right-0 flex-col bg-[rgb(23,23,24)] text-lime-50"
    >
      <Docs />
      <Footer />
    </div>
  )
}
