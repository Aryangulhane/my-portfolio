'use client'

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `\src\app\studio\[[...tool]]\page.tsx` route
 */

import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schema} from './sanity/schemaTypes/index'

// Try environment variables first, fallback to hardcoded values
const projectId = 
  process.env.SANITY_STUDIO_PROJECT_ID || 
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 
  'krdza9oy'

const dataset = 
  process.env.SANITY_STUDIO_DATASET || 
  process.env.NEXT_PUBLIC_SANITY_DATASET || 
  'production'

const config = defineConfig({
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

export default config