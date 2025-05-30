'use client'

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `\src\app\studio\[[...tool]]\page.tsx` route
 */

import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schema} from './sanity/schemaTypes/index'

// Check if we're in a browser environment (studio deployment)
const isBrowser = typeof window !== 'undefined'

// For studio deployment, always use hardcoded values
// For Next.js development, try environment variables with fallbacks
const projectId = isBrowser 
  ? 'krdza9oy' 
  : (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'krdza9oy')

const dataset = isBrowser 
  ? 'production' 
  : (process.env.NEXT_PUBLIC_SANITY_DATASET || 'production')

export default defineConfig({
  name: 'default',
  title: 'My Portfolio Studio',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schema.types,
  },
  apiVersion: '2023-08-01',
  useCdn: false,
})