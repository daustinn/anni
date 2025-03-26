'use client'

import React from 'react'
import { Highlight as HighlightPrism } from 'prism-react-renderer'
import { cn } from '@nanui/utils'
import { prismDarkTheme, prismLightTheme } from '@/utils/prism-theme'

export default function Highlight({
  language = 'tsx',
  copyValue,
  title,
  actionChild,
  action,
  info,
  code,
  showCopyButton = true,
  copyButtonTop = true,
  theme = 'dark',
  className = ''
}: {
  copyValue?: string
  copyButtonTop?: boolean
  title?: string
  info?: string
  actionChild?: React.ReactNode
  action?: () => void
  showCopyButton?: boolean
  code?: string
  theme?: 'dark' | 'light'
  className?: string
  language?:
    | 'tsx'
    | 'jsx'
    | 'js'
    | 'md'
    | 'html'
    | 'css'
    | 'json'
    | 'yaml'
    | 'yml'
    | 'sh'
    | 'bash'
    | 'shell'
    | 'diff'
    | 'plaintext'
    | 'text'
    | 'graphql'
    | 'curl'
}) {
  const [coping, setCoping] = React.useState(false)

  const handleCopy = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(copyValue ?? code ?? '')
      setCoping(true)
      setTimeout(() => setCoping(false), 2000)
    }
  }
  return (
    <div
      className={cn(
        'w-full flex flex-col overflow-auto group h-full relative rounded-xl border text-sm',
        className,
        theme === 'light'
          ? 'bg-[#fefcfa] text-stone-950 shadow-[0_0_10px_rgba(0,0,0,.1)] border-[#e3e2e2]'
          : 'text-stone-100 bg-[#161514] shadow-[0_0_10px_rgba(0,0,0,.5)] border-stone-500/20'
      )}
    >
      {title && (
        <nav className="border-b border-dashed border-stone-500/20 p-2.5 text-white/40">
          {title}
        </nav>
      )}
      <HighlightPrism
        theme={theme === 'dark' ? prismDarkTheme : prismLightTheme}
        code={code ?? ''}
        language={language}
      >
        {({ tokens, getLineProps, getTokenProps, className, style }) => (
          <pre className={`p-3 px-3 ${className}`} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </HighlightPrism>
      {(info || action) && (
        <div className="pl-3 flex items-center pr-1 pb-1 text-xs">
          {info && (
            <p className="grow pointer-events-auto text-wrap text-white/40">
              {info}
            </p>
          )}
          {action && (
            <button
              onClick={action}
              className="border-2 ml-auto float-right rounded-full text-white font-medium border-stone-400 p-0.5 px-2 hover:scale-105 transition-transform active:scale-95"
            >
              {actionChild}
            </button>
          )}
        </div>
      )}
      {showCopyButton && (
        <div
          data-top={copyButtonTop ? '' : undefined}
          className="absolute opacity-0 group-hover:opacity-100 transition-opacity inset-y-0 right-0 p-3 flex items-center data-[top]:items-start pointer-events-none"
        >
          <button
            onClick={handleCopy}
            title="Copy to clipboard"
            className="flex z-[1] hover:text-white text-white/50 text-xs font-medium hover:scale-110 active:scale-95 pointer-events-auto transition-transform ml-auto pl-2 items-center justify-center"
          >
            {coping ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}
    </div>
  )
}
