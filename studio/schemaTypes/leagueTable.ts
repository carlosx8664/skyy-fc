export default {
  name: 'leagueTable',
  title: 'League Table Entry',
  type: 'document',
  fields: [
    { name: 'position', title: 'Position',      type: 'number' },
    { name: 'team',     title: 'Team Name',      type: 'string' },
    { name: 'played',   title: 'Played',         type: 'number' },
    { name: 'won',      title: 'Won',            type: 'number' },
    { name: 'drawn',    title: 'Drawn',          type: 'number' },
    { name: 'lost',     title: 'Lost',           type: 'number' },
    { name: 'gf',       title: 'Goals For',      type: 'number' },
    { name: 'ga',       title: 'Goals Against',  type: 'number' },
    { name: 'points',   title: 'Points',         type: 'number' },
    { name: 'isSkyy',   title: 'Is SKYY FC?',    type: 'boolean' },
  ],
  preview: {
    select: { title: 'position', subtitle: 'team' },
    prepare({ title, subtitle }: any) {
      return { title: `${title}. ${subtitle}` };
    },
  },
}
