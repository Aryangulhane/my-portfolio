'use client'

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `\src\app\studio\[[...tool]]\page.tsx` route
 */

import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schema} from './sanity/schemaTypes/index'

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID')
}

if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SANITY_DATASET')
}

export default defineConfig({
  name: 'default',
  title: 'My Portfolio Studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  basePath: '/',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schema.types,
  },
  apiVersion: '2023-05-03',
  useCdn: false,
  perspective: 'published'
})
