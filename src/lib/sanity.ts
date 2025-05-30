import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'

export const client = createClient({
  projectId: 'krdza9oy',
  dataset: 'production',
  apiVersion: '2024-05-30',
  useCdn: false,
  perspective: 'published',
})

const builder = imageUrlBuilder(client)

export function urlForImage(source: Image) {
  if (!source?.asset?._ref) {
    return undefined
  }
  
  return builder?.image(source)
} 