/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React from 'react'
import Highlight from '@/ui/components/highlight'
import { STEP_ONE, STEP_THREE, STEP_TWO } from './codes'

const steps = {
  1: {
    code: STEP_ONE,
    title: 'Install Anni',
    language: 'md',
    valueCode: 'npm install anni',
    description:
      'Install Anni in your project using your favorite package manager.'
  },
  2: {
    code: STEP_TWO,
    language: 'tsx',
    valueCode: null,
    title: 'Add Toaster to your app',
    description:
      'Add the Toaster component to the root of your React, Next, or React-based framework project. It also accepts default properties.'
  },
  3: {
    code: STEP_THREE,
    title: 'Use the toast function',
    description:
      'You can now use the notifications feature from anywhere in your app.',
    valueCode: null,
    language: 'tsx'
  }
}

// const exampleCodeTypes = `import { toast } from 'anni'

// toast.error('Your error message 🚫')
// toast.success('Your success message 🚀'
// toast.warning('Your warning message ⚠️')
// toast.info('Your info message ℹ️')`

// const exampleCodeAction = `import { toast } from 'anni'

// toast.error('Your error message 🚫')
// toast.success('Your success message 🚀'
// toast.warning('Your warning message ⚠️')
// toast.info('Your info message ℹ️')`

export default function Steps() {
  //   const handleToast = (type: string) => {
  //     const randomToast =
  //       posiblesToasts[Math.floor(Math.random() * posiblesToasts.length)]
  //     toast(randomToast, {
  //       type: type as any
  //     })
  //   }

  return (
    <section className="text-black font-sans max-w-2xl mx-auto w-ful px-4">
      <h2 className="text-center font-bold tracking-tighter text-5xl pb-10">
        Start using it
      </h2>
      <div className="py-5">
        {Object.entries(steps).map(([key, value]) => (
          <div key={key} className="grid py-3 grid-cols-12 gap-2 items-center">
            <div className="space-y-1 col-span-5 text-center">
              <div className="aspect-square mx-auto w-6 bg-brown-700 rounded-full flex items-center justify-center font-bold text-oasis-50 text-sm">
                {key}
              </div>
              <p className="font-bold text-lg">{value.title}</p>
              <p className="text-sm text-red-600">{value.description}</p>
            </div>
            <div className="col-span-7">
              <Highlight
                code={value.code}
                copyValue={value.valueCode ?? value.code}
                copyButtonTop
                language={value.language as any}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
