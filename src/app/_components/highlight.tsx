'use client'

import React from 'react'
import { Highlight as HighlightPrism } from 'prism-react-renderer'
import { prismDarkAnniTheme } from '@/utils/theme'
import { cn } from '@nanui/utils'
import { Copy } from '@/icons'
import { toast } from 'anni'

export default function Highlight({
  children,
  language = 'tsx',
  copyValue,
  showCopyButton = true,
  copyButtonTop = false
}: {
  children: string
  copyValue?: string
  copyButtonTop?: boolean
  showCopyButton?: boolean
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
}) {
  const handleCopy = () => {
    navigator.clipboard.writeText(copyValue ?? children)
    toast('Code copied to clipboard 🗒️')
  }
  return (
    <div className="w-full group h-full z-[100] relative">
      <HighlightPrism
        theme={prismDarkAnniTheme}
        code={children}
        language={language}
      >
        {({ tokens, getLineProps, getTokenProps, className, style }) => (
          <pre
            className={cn(
              'rounded-xl border overflow-auto border-stone-500/10 text-sm p-3 px-3',
              className
            )}
            style={style}
          >
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
      {showCopyButton && (
        <div
          data-top={copyButtonTop ? '' : undefined}
          className="absolute group-hover:opacity-100 opacity-0 transition-opacity inset-y-0 right-0 p-3 flex items-center data-[top]:items-start pointer-events-none"
        >
          <button
            onClick={handleCopy}
            title="Copy to clipboard"
            className="flex z-[1] hover:scale-110 active:scale-95 pointer-events-auto text-stone-500 hover:text-white transition-transform ml-auto pl-2 items-center justify-center"
          >
            <Copy />
          </button>
        </div>
      )}
    </div>
  )
}
