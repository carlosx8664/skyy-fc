// studio/src/schemaTypes/highlight.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'highlight',
  title: 'Match Highlight',
  type: 'document',
  fields: [
    defineField({ name: 'fixture', title: 'Fixture (e.g. Skyy FC vs New Edubiase)', type: 'string' }),
    defineField({ name: 'date', title: 'Match Date', type: 'date' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
    defineField({ name: 'videoEmbed', title: 'YouTube Embed URL', type: 'url',
      description: 'Use format: https://www.youtube.com/embed/VIDEO_ID' }),
    defineField({ name: 'videoWatch', title: 'YouTube Watch URL', type: 'url',
      description: 'Use format: https://www.youtube.com/watch?v=VIDEO_ID' }),
  ],
  preview: {
    select: { title: 'fixture', subtitle: 'date' },
  },
})
