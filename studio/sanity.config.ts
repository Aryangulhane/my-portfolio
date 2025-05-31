import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schema } from './sanity/schemaTypes/index'

export default defineConfig({
  basePath: '/studio',
  projectId: 'krdza9oy',
  dataset: 'production',
  
  plugins: [
    deskTool(),
    visionTool()
  ],

  schema: {
    types: schema.types,
  },

  cors: {
    allowOrigins: [
      'https://www.sanity.io',
      'https://aryanportfolio.sanity.studio',
      'http://localhost:3333'
    ]
  }
})