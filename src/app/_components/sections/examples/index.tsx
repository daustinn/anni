/* eslint-disable react/react-in-jsx-scope */

import Highlight from '../../highlight'
import Actions from './actions'
import CloseButton from './close-button'
import Types from './types'
import Variants from './variant'
import Positions from './position'

const exampleCodeBlock = `import { toast, Toaster } from 'anni'

export default function App() {
  return (
    <main>
      <Toaster />
      <button onClick={() => toast('Success Toast 🚀')}>
        Render a toast
      </button>
    </main>
  )
}`

const tailwindCSSBlock = `import type { Config } from 'tailwindcss'
export default {
  //... 
  content: [
    //...
    './node_modules/anni/dist/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  //...
} satisfies Config`

export default function Examples() {
  return (
    <section className="space-y-4 p-7 overflow-y-auto">
      <article>
        <h2 className="font-bold text-base tracking-tight">Installation</h2>
        <p className="dark:text-stone-black text-sm">
          Use npm, pnpm, or bun to install Anni in your project.
        </p>
        <div className="pt-5 space-y-2">
          <Highlight copyValue="npm install anni" language="md">
            # npm install anni
          </Highlight>
        </div>
      </article>
      <article>
        <h2 className="font-bold text-base tracking-tight">
          Tailwind CSS configuration
        </h2>
        <p className="dark:text-stone-black text-sm">
          To include Anni in your Tailwind CSS build, add the following to your
          tailwind.config.js file.
        </p>
        <div className="pt-5">
          <Highlight copyButtonTop language="tsx">
            {tailwindCSSBlock}
          </Highlight>
        </div>
      </article>
      <article>
        <h2 className="font-bold text-base tracking-tight">Usage</h2>
        <p className="dark:text-stone-black text-sm">
          Use the toast function to render a toast notification.
        </p>
        <div className="pt-5">
          <Highlight copyButtonTop language="tsx">
            {exampleCodeBlock}
          </Highlight>
        </div>
      </article>
      <Types />
      <Actions />
      <Variants />
      <CloseButton />
      <Positions />
    </section>
  )
}
