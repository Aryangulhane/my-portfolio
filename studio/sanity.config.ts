'use client'

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `\src\app\studio\[[...tool]]\page.tsx` route
 */

import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schema} from './sanity/schemaTypes/index'

// Debug environment variables
console.log('Studio Project ID:', process.env.SANITY_STUDIO_PROJECT_ID)
console.log('Studio Dataset:', process.env.SANITY_STUDIO_DATASET)

// Use hardcoded values as fallback
const projectId = 'krdza9oy'
const dataset = 'production'

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
  cors: {
    allowOrigins: ['https://aryanportfolio.sanity.studio', 'https://www.sanity.io'],
    allowCredentials: true
  }
})
