import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'

// Debug environment variables
console.log('Client Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
console.log('Client Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET)

// Use hardcoded values as fallback
const projectId = 'krdza9oy'
const dataset = 'production'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || dataset,
  apiVersion: '2023-08-01',
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN
})

const builder = imageUrlBuilder(client)

export function urlForImage(source: Image) {
  if (!source?.asset?._ref) {
    return undefined
  }
  
  return builder.image(source)
}

export function urlFor(source: any) {
  return builder.image(source)
} 