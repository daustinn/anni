import Hero from './hero'
import { Fredoka } from 'next/font/google'
import Steps from './steps'
import TypesExamples from './types'
import PositionsExample from './positions'
import MediaExample from './media'
import Theming from './theming'
import Info from './info'
import Link from 'next/link'

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['300', '300', '400', '500', '600', '700']
})
export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero fredoka={fredoka} />
      <Steps />
      <TypesExamples />
      <PositionsExample />
      <MediaExample />
      <Theming />
      <Info />
      <footer className="font-sans max-w-2xl mx-auto w-full space-y-2 px-4 pb-10">
        <p>
          Build by{' '}
          <Link href="https://daustinn.com" className="font-semibold underline">
            Daustinn
          </Link>
        </p>
      </footer>
    </main>
  )
}
