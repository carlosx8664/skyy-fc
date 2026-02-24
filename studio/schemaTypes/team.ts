export default {
  name: 'team',
  title: 'Team',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Team Name',
      type: 'string',
    },
    {
      name: 'logo',
      title: 'Team Logo',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'shortName',
      title: 'Short Name (e.g. SKYY)',
      type: 'string',
    },
  ],
  preview: {
    select: { title: 'name', media: 'logo' },
  },
}
