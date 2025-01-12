'use client'

import React from 'react'
import Highlight from '../../highlight'
import { toast } from 'anni'

export default function Types() {
  const [currentType, setCurrentType] =
    React.useState<keyof typeof typeList>('default')

  const typeList: {
    [key: string]: {
      key: 'success' | 'error' | 'info' | 'warning' | 'jsx' | null
      title: string | React.ReactNode
      description?: string
      codeBlock: string
      action?: () => void
    }
  } = React.useMemo(() => {
    return {
      default: {
        key: null,
        title: 'Default Toast 🚀',
        codeBlock: `toast('Default Toast 🚀')`
      },
      description: {
        key: null,
        title: 'Default Toast 🚀',
        description: 'With toast description',
        codeBlock: `toast('Default Toast 🚀', {
    description: 'With toast description'
})`
      },
      success: {
        key: 'success',
        title: 'This is a success message. 🚀',
        codeBlock: `toast.success('Success Toast 🚀')`
      },
      error: {
        key: 'error',
        title: 'This is a error message. 💥',
        codeBlock: `toast.error('Error Toast 💥')`
      },
      info: {
        key: 'info',
        title: 'This is a info message. ℹ️',
        codeBlock: `toast.info('Info Toast ℹ️')`
      },
      warning: {
        key: 'warning',
        title: 'This is a warning message. ⚠️',
        codeBlock: `toast.warning('Warning Toast ⚠️')`
      },
      jsx: {
        key: 'jsx',
        title: <div className="font-semibold">Daustinn 👨‍💻</div>,
        codeBlock: `toast.jsx(<div className="font-semibold">Daustinn 👨‍💻</div>)
        
// or
toast(<div className="font-semibold">Daustinn 👨‍💻</div>)`
      }
    }
  }, [])

  const handleTypeChange = (type: keyof typeof typeList) => {
    const detail = typeList[type]
    setCurrentType(type)
    {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      detail.key
        ? toast[detail.key](detail.title, {
            description: detail.description || undefined,
            action: detail.action || undefined
          })
        : toast(detail.title, {
            description: detail.description || undefined,
            action: detail.action || undefined
          })
    }
  }

  return (
    <article className="max-w-2xl mx-auto">
      <h2 className="font-semibold text-xl tracking-tight">Types</h2>
      <p className="dark:text-stone-300/60">
        Anni, you have several types of notifications and they are very easy to
        execute.
      </p>
      <div className="pt-5">
        <nav className="flex gap-2 pb-4 flex-wrap">
          {Object.entries(typeList).map(([key]) => (
            <button
              onClick={() => handleTypeChange(key as keyof typeof typeList)}
              key={key}
              className="capitalize shadow-md shadow-black/30 bg-stone-500/10 hover:scale-105 active:scale-95 transition-transform p-2 font-medium text-sm px-3 rounded-xl border border-stone-500/50"
            >
              {key}
            </button>
          ))}
        </nav>
        <Highlight copyButtonTop language="tsx">
          {typeList[currentType].codeBlock}
        </Highlight>
      </div>
    </article>
  )
}
