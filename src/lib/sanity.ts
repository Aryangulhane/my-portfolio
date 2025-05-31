import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID')
}

if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SANITY_DATASET')
}

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
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