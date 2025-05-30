import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = '2023-05-03' // Using a stable API version

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
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