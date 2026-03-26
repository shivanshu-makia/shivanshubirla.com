import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans, DM_Mono } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Shivanshu Birla - Student of life. Avid investor. Aspirational reader.',
  description: 'Personal website and journal of Shivanshu Birla. Founding Partner at Makia Capital. ISB MBA, CFA. Based in Delhi, India.',
  keywords: ['Shivanshu Birla', 'Makia Capital', 'Investor', 'ISB MBA', 'CFA', 'Delhi'],
  authors: [{ name: 'Shivanshu Birla' }],
  openGraph: {
    title: 'Shivanshu Birla',
    description: 'Student of life. Avid investor. Aspirational reader.',
    url: 'https://shivanshubirla.com',
    siteName: 'Shivanshu Birla',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shivanshu Birla',
    description: 'Student of life. Avid investor. Aspirational reader.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <head>
        {/* Elfsight placeholder for Instagram embed */}
        {/* <script src="https://static.elfsight.com/platform/platform.js" data-use-service-core defer></script> */}
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
