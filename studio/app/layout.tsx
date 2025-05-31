import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sanity Studio',
  description: 'Content management for your portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Handle incoming messages
    const handleMessage = (event: MessageEvent) => {
      // Only accept messages from trusted origins
      const trustedOrigins = [
        'https://www.sanity.io',
        'https://aryanportfolio.sanity.studio',
        'http://localhost:3333'
      ]
      
      if (!trustedOrigins.includes(event.origin)) {
        console.warn(`Received message from untrusted origin: ${event.origin}`)
        return
      }

      // Handle the message
      console.log('Received message:', event.data)
    }

    // Add event listener
    window.addEventListener('message', handleMessage)

    // Cleanup
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://cdn.sanity.io"
          crossOrigin="anonymous"
        />
        <script
          src="https://core.sanity-cdn.com/bridge.js"
          async
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
} 