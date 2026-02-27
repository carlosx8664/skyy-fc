// studio/src/schemaTypes/player.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'player',
  title: 'Player',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Full Name', type: 'string' }),
    defineField({ name: 'number', title: 'Jersey Number', type: 'number' }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Goalkeeper', value: 'goalkeeper' },
          { title: 'Defender', value: 'defender' },
          { title: 'Midfielder', value: 'midfielder' },
          { title: 'Forward', value: 'forward' },
        ],
        layout: 'radio',
      },
    }),
    defineField({ name: 'position', title: 'Position (e.g. CM | DM)', type: 'string' }),
    defineField({ name: 'role', title: 'Role (e.g. Tempo Setter)', type: 'string' }),
    defineField({ name: 'foot', title: 'Preferred Foot', type: 'string' }),
    defineField({ name: 'isCaptain', title: 'Is Captain?', type: 'boolean' }),
    defineField({ name: 'debut', title: 'Debut Season', type: 'string' }),
    defineField({ name: 'bio', title: 'Bio', type: 'text', rows: 4 }),
    defineField({
      name: 'tags',
      title: 'Tags (e.g. Fast, Strong)',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'image',
      title: 'Player Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'object',
      fields: [
        defineField({ name: 'goals', title: 'Goals', type: 'string' }),
        defineField({ name: 'assists', title: 'Assists', type: 'string' }),
        defineField({ name: 'matches', title: 'Matches', type: 'string' }),
        defineField({ name: 'cleanSheets', title: 'Clean Sheets (GK only)', type: 'string' }),
        defineField({ name: 'conceded', title: 'Goals Conceded (GK only)', type: 'string' }),
      ],
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'position', media: 'image' },
  },
})
