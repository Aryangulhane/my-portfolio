'use client'

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `\src\app\studio\[[...tool]]\page.tsx` route
 */

import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schema} from './sanity/schemaTypes/index'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works

export default defineConfig({
  name: 'default',
  title: 'My Portfolio Studio',
  projectId: 'krdza9oy',
  dataset: 'production',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schema.types,
  },
})
