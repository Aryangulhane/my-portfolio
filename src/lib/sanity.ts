import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Debug environment variables
console.log('Environment Variables:', {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  hasToken: !!process.env.SANITY_API_TOKEN,
})

// Validate environment variables with fallbacks
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'krdza9oy'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// Create the config
const config = {
  projectId,
  dataset,
  apiVersion: '2024-03-19',
  useCdn: true,
  token: process.env.SANITY_API_TOKEN,
  perspective: 'published' as const,
  stega: {
    enabled: false,
    studioUrl: '/studio'
  },
  withCredentials: true,
}

// Create the client
export const client = createClient(config)

// Helper function for generating image URLs
const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  if (!source) {
    console.warn('urlFor called with no source')
    return null
  }
  return builder.image(source)
}

// Export the config for use in other files
export { config }

// Add type for window.sanityBridge
declare global {
  interface Window {
    sanityBridge?: {
      init: (config: { targetOrigin: string }) => void
      send: (message: any) => void
      receive: (callback: (message: any) => void) => void
    }
  }
}
