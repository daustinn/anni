import React from 'react'

export default function Footer() {
  return (
    <footer className="border-t p-5 border-stone-800">
      <p className="text-center text-stone-300 text-sm">
        This site is built with Next.js and Tailwind CSS by{' '}
        <a
          href="https://daustinn.com"
          className="hover:underline text-stone-400"
          target="_blank"
          rel="noreferrer"
        >
          Daustinn
        </a>
      </p>
    </footer>
  )
}
