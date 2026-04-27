import type { Metadata } from 'next'
import './globals.css'
import { SmoothScroll } from './_components/SmoothScroll'

export const metadata: Metadata = {
  title: 'Future Media — Web Design for Michigan Trades',
  description: 'A small Michigan studio building websites that make trade businesses look like they hired a Manhattan agency. Free mockup. One-time pricing from $499.',
  keywords: 'Michigan web design, contractor website, blue collar website, trade business website, plumber HVAC roofer website Michigan',
  icons: {
    icon: '/logo.jpg',
    apple: '/logo.jpg',
  },
  openGraph: {
    title: 'Future Media — Web Design for Michigan Trades',
    description: 'A small Michigan studio building websites that make trade businesses look like they hired a Manhattan agency.',
    type: 'website',
    url: 'https://futuremediawebdesign.com',
  },
  metadataBase: new URL('https://futuremediawebdesign.com'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/*
          Fonts: Fraunces (variable serif — display) + Geist (sans — body) + Geist Mono.
          Anthropic's design cookbook explicitly recommends AGAINST Inter/Roboto.
          Fraunces gives Claude's editorial feel. Geist is distinctive and not overused.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT@0,9..144,300..900,30..100;1,9..144,300..900,30..100&family=Geist:wght@300..700&family=Geist+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
