export default {
  name: 'leagueTable',
  title: 'League Table Entry',
  type: 'document',
  fields: [
    {
      name: 'position',
      title: 'Position',
      type: 'number',
      options: {
        list: Array.from({ length: 16 }, (_, i) => ({
          title: String(i + 1),
          value: i + 1,
        })),
      },
      validation: (Rule: any) => Rule.required().min(1).max(16),
    },

    {
      name: 'team',
      title: 'Team',
      type: 'reference',
      to: [{ type: 'team' }],
      validation: (Rule: any) => Rule.required(),
    },

    { name: 'played', title: 'Played', type: 'number', validation: (Rule: any) => Rule.min(0) },
    { name: 'won', title: 'Won', type: 'number', validation: (Rule: any) => Rule.min(0) },
    { name: 'drawn', title: 'Drawn', type: 'number', validation: (Rule: any) => Rule.min(0) },
    { name: 'lost', title: 'Lost', type: 'number', validation: (Rule: any) => Rule.min(0) },
    { name: 'gf', title: 'Goals For', type: 'number', validation: (Rule: any) => Rule.min(0) },
    { name: 'ga', title: 'Goals Against', type: 'number', validation: (Rule: any) => Rule.min(0) },
    { name: 'points', title: 'Points', type: 'number', validation: (Rule: any) => Rule.min(0) },

    { name: 'isSkyy', title: 'Is SKYY FC?', type: 'boolean' },
  ],

  preview: {
    select: {
      position: 'position',
      teamName: 'team.name',
    },
    prepare({ position, teamName }: any) {
      return { title: `${position}. ${teamName ?? '—'}` };
    },
  },
}
