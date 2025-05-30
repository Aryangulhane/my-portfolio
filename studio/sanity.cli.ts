import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'krdza9oy',
    dataset: 'production'
  },
  server: {
    port: 3333
  }
}) 