import { DaustinnSignature } from '@/icons/indext'
import React from 'react'

export default function Footer() {
  return (
    <footer className="max-w-2xl mx-auto w-full">
      <div className="border-t pt-5 px-9 w-full flex items-center border-stone-800">
        <p className="max-w-[200px] flex-grow text-stone-300 text-sm">
          This site is built with Next.js and Tailwind CSS by{' '}
          <a
            href="https://daustinn.com"
            className="hover:underline text-orange-200"
            target="_blank"
            rel="noreferrer"
          >
            Daustinn
          </a>
        </p>
        <div className="ml-auto text-stone-500">
          <DaustinnSignature size={90} />
        </div>
      </div>
    </footer>
  )
}
