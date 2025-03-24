import React from 'react'

export default function Info() {
  return (
    <section className="font-sans max-w-2xl mx-auto w-full space-y-2 px-4 py-5">
      <p>
        Anni leverages{' '}
        <span className="font-medium">@radix-ui/react-toast</span> for enhanced
        accessibility, ensuring a more inclusive user experience. This component
        is crafted with pure CSS and TypeScript, making it independent of
        Tailwind CSS or other CSS libraries.
      </p>
      <p>
        It is not a copy or competitor to existing solutions like{' '}
        <span className="font-medium">Sonner</span>,{' '}
        <span className="font-medium"> React-Hot-Toastify</span>, but rather a
        unique addition to the existing ecosystem, offering a more visually
        appealing and elegant approach.
      </p>
    </section>
  )
}
