'use client'

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `\src\app\studio\[[...tool]]\page.tsx` route
 */

import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schema} from './sanity/schemaTypes/index'

export default defineConfig({
  name: 'default',
  title: 'My Portfolio Studio',
  projectId: 'krdza9oy',
  dataset: 'production',
  basePath: '/',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schema.types,
  },
  apiVersion: '2024-05-30',
  useCdn: false,
  perspective: 'published'
})
