import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schema} from './sanity/schemaTypes/index'

export default defineConfig({
  name: 'default',
  title: 'My Portfolio Studio',
  
  projectId: 'krdza9oy',
  dataset: 'production',
  
  plugins: [
    structureTool(),
    visionTool()
  ],

  schema: {
    types: schema.types,
  },
})