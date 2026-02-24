export default {
  name: 'fixture',
  title: 'Fixture',
  type: 'document',
  fields: [
    {
      name: 'homeTeam',
      title: 'Home Team',
      type: 'reference',
      to: [{ type: 'team' }],
    },
    {
      name: 'awayTeam',
      title: 'Away Team',
      type: 'reference',
      to: [{ type: 'team' }],
    },
    { name: 'date',     title: 'Match Date',     type: 'datetime' },
    { name: 'venue',    title: 'Venue',           type: 'string' },
    { name: 'kickOff',  title: 'Kick-off Time',   type: 'string' },
    { name: 'matchday', title: 'Matchday #',      type: 'number' },
  ],
  preview: {
    select: {
      home: 'homeTeam.name',
      away: 'awayTeam.name',
      date: 'date',
    },
    prepare({ home, away, date }: any) {
      const d = date ? new Date(date).toLocaleDateString('en-GB') : 'TBD';
      return { title: `${home} vs ${away}`, subtitle: d };
    },
  },
}
