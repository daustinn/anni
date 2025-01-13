'use client'

import React from 'react'
import Highlight from '../../highlight'
import { toast } from 'anni'

const types: {
  [key: string]: {
    codeBlock: string
    toast: () => void
  }
} = {
  default: {
    toast: () => toast('Default Toast 🚀'),
    codeBlock: `toast('Default Toast 🚀')`
  },
  description: {
    toast: () =>
      toast('Default Toast 🚀', {
        description: 'With toast description'
      }),
    codeBlock: `toast('Default Toast 🗒️', {
  description: 'With toast description'
})`
  },
  success: {
    toast: () => toast.success('Success Toast ✅'),
    codeBlock: `toast.success('Success Toast ✅')`
  },
  error: {
    toast: () => toast.error('Error Toast ❌'),
    codeBlock: `toast.error('Error Toast ❌')`
  },
  info: {
    toast: () => toast.info('Info Toast ℹ️'),
    codeBlock: `toast.info('Info Toast ℹ️')`
  },
  warning: {
    toast: () => toast.warning('Warning Toast ⚠️'),
    codeBlock: `toast.warning('Warning Toast ⚠️')`
  },
  custom: {
    toast: () =>
      toast(
        <div className="font-semibold flex items-center gap-2 p-2">
          <div className="w-10 aspect-square rounded-xl overflow-hidden">
            <img
              src="/daustinn.webp"
              alt="Daustinn profile picture"
              className="object-cover"
            />
          </div>
          <div>
            <p>Daustiinn 👨‍💻 (David Bendezú)</p>
            <p className="text-xs font-medium">Fullstack Developer</p>
          </div>
        </div>,
        {
          className: '!p-0'
        }
      ),
    codeBlock: `toast(
  <div className="font-semibold flex items-center gap-2 p-2">
    <div className="w-10 aspect-square rounded-xl overflow-hidden">
      <img
        src="/daustinn.webp"
        alt="Daustinn profile picture"
        className="object-cover"
      />
    </div>
    <div>
      <p>Daustiinn 👨‍💻 (David Bendezú)</p>
      <p className="text-xs font-medium">Fullstack Developer</p>
    </div>
  </div>,
  {
    className: '!p-0'
  }
)`
  }
}

export default function Types() {
  const [current, setCurrent] = React.useState<keyof typeof types>('default')

  const handle = (type: keyof typeof types) => {
    const detail = types[type]
    setCurrent(type)
    detail.toast()
  }

  return (
    <article>
      <h2 className="font-bold text-base tracking-tight">Types</h2>
      <p className="dark:text-stone-black text-sm">
        Anni, you have several types of notifications and they are very easy to
        execute.
      </p>
      <div className="pt-5">
        <nav className="flex gap-2 pb-4 flex-wrap">
          {Object.entries(types).map(([key]) => (
            <button
              onClick={() => handle(key as keyof typeof types)}
              key={key}
              className="capitalize text-sm bg-black text-lime-50 hover:scale-105 active:scale-95 transition-transform p-2 font-medium px-3 rounded-xl"
            >
              {key}
            </button>
          ))}
        </nav>
        <Highlight copyButtonTop language="tsx">
          {types[current].codeBlock}
        </Highlight>
      </div>
    </article>
  )
}
