import './globals.css'
import { ReactNode } from 'react'
// o proprio next ja importa fonts
import {
  // roboto_flex se ajusta aos tamanhos de font
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjuree,
} from 'next/font/google'

// o next importa a font e cria uma variavel no css que podemos usar (variable)

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const baiJamjuree = BaiJamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-bai-jamjuree',
})

export const metadata = {
  title: 'NLW - Spacetime',
  description:
    'Uma cápsula do tempo construída com React, React Native, Node, Next.JS, TailwindCSS e TypeScript',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${baiJamjuree.variable} bg-gray-900 font-sans text-gray-100`}
      >
        {children}
      </body>
    </html>
  )
}
