'use client'

import React from 'react'
import { toast } from 'anni'
import Highlight from '@/ui/components/highlight'

const types = {
  default: {
    code: 'toast("Defaut message")',
    action: () => toast('Defaut message')
  },
  info: {
    code: 'toast.info("Info message")',
    action: () => toast.info('Info message')
  },
  success: {
    code: 'toast.success("Success message")',
    action: () => toast.success('Success message')
  },
  warning: {
    code: 'toast.warning("Warning message")',
    action: () => toast.warning('Warning message')
  },
  error: {
    code: 'toast.error("Error message")',
    action: () => toast.error('Error message')
  },
  action: {
    code: `toast("Toast with action button", {
    action: () => console.log('Action clicked'),
    actionChild: 'Click here'
  }
)`,
    action: () =>
      toast('Toast with action button', {
        action: () => console.log('Action clicked'),
        actionChild: 'Click here'
      })
  },
  'dismiss button': {
    code: `toast('Close button message', {
  dismissButton: true,
  dismissChild: 'Close',

  action: () => console.log('Action clicked'),
  actionChild: 'Click here',
})`,
    action: () =>
      toast('Close button message', {
        dismissButton: true,
        dismissChild: 'Close',

        action: () => console.log('Action clicked'),
        actionChild: 'Click here'
      })
  },
  JSX: {
    code: `toast(<div>JSX Toast notification</div>)`,
    action: () => toast(<div>JSX Toast notification</div>)
  },
  'tailwind CSS': {
    code: `toast(({ dismiss }) => (
  <div className="">
    <p className="pb-2">
      You can now use the notifications feature from anywhere in your app.
    </p>
    <button
      className="text-sm rounded-full p-1 px-2 border-2 border-stone-500/50"
      onClick={dismiss}
    >
      Dismiss notification
    </button>
  </div>
))`,
    action: () =>
      toast(({ dismiss }) => (
        <div className="">
          <p className="pb-2">
            You can now use the notifications feature from anywhere in your app.
          </p>
          <button
            className="text-sm rounded-full p-1 px-2 border-2 border-stone-500/50"
            onClick={dismiss}
          >
            Dismiss notification
          </button>
        </div>
      ))
  }
}

export default function TypesExamples() {
  const [toastCode, setToastCode] = React.useState(types.default.code)
  return (
    <section className="text-black font-sans max-w-2xl mx-auto w-ful px-4 py-10">
      <h2 className="text-left font-bold tracking-tighter text-xl">Types</h2>
      <p className="pb-1">Anni, you have several types of notifications.</p>
      <div className="flex flex-wrap gap-2 bg-brown-100/50 rounded-lg p-2">
        {Object.entries(types).map(([key, type]) => (
          <button
            key={key}
            className="bg-gradient-to-b text-sm font-semibold capitalize shadow-[0_2px_2px_rgba(0,0,0,.3)] from-white via-oasis-50 to-brown-100 text-brown-800 px-4 py-2 rounded-lg"
            onClick={() => {
              setToastCode(type.code)
              type.action()
            }}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="pt-2">
        <Highlight code={toastCode} language="tsx" copyButtonTop />
      </div>
    </section>
  )
}
