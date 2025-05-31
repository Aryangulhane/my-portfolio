import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'

// Debug environment variables
console.log('Client Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
console.log('Client Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET)

// Use hardcoded values as fallback
const projectId = 'krdza9oy'
const dataset = 'production'

// Create the config
const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || dataset,
  apiVersion: '2023-08-01',
  useCdn: false, // Set to true for production if you want faster responses
  token: process.env.SANITY_API_READ_TOKEN
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
