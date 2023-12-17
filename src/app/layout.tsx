import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import Footer from '@/components/Layout/Footer'
import '@/styles/globals.css'
import React from 'react'

export const metadata: Metadata = {
  title: 'Github Profile',
  description: 'Search Github Profile',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className='dark font-sans'>
        {children}
        <Footer />
      </body>
    </html>
  )
}
