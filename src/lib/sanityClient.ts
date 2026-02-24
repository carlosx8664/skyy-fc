import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'qzvxb9vu',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2026-02-23',
})
