import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schema } from './sanity/schemaTypes/index'

export default defineConfig({
  name: 'default',
  title: 'My Portfolio Studio',
  
  projectId: 'krdza9oy',
  dataset: 'production',
  
  plugins: [
    deskTool(),
    visionTool()
  ],

  schema: {
    types: schema.types,
  },
})