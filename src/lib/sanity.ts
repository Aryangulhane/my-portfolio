import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'

// Validate environment variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

if (!projectId) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID')
}

if (!dataset) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SANITY_DATASET')
}

// Create the config
const config = {
  projectId,
  dataset,
  apiVersion: '2023-08-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: 'published' as const,
  stega: {
    enabled: false,
    studioUrl: '/studio'
  }
}

// Create the client
export const client = createClient(config)

// Helper function for generating image URLs
const builder = imageUrlBuilder(client)

export function urlForImage(source: Image) {
  if (!source?.asset?._ref) {
    return undefined
  }
  return builder.image(source)
}

// Export the config for use in other files
export { config }
