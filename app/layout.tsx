import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Future Media — Michigan Web Design for Local Businesses',
  description: 'Future Media builds high-converting websites for Michigan plumbers, electricians, HVAC, roofers, and local businesses. Get your FREE mockup today.',
  keywords: 'web design Michigan, local business website, plumber website, electrician website, HVAC website, Michigan SEO',
  openGraph: {
    title: 'Future Media — Michigan Web Design Studio',
    description: 'We build websites that rank on Google and turn searchers into customers. Free mockup for Michigan businesses.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=Outfit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
