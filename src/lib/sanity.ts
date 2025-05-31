import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

// Hardcoded configuration - no environment variables
const config = {
  projectId: 'krdza9oy',
  dataset: 'production',
  apiVersion: '2023-08-01',
  useCdn: false, // Set to true for production if you want faster responses
}

// Create the client
export const client = createClient(config)

// Helper function for generating image URLs
const builder = imageUrlBuilder(config)

export function urlForImage(source: any) {
  return builder.image(source)
}

// Export the config for use in other files
export { config }
