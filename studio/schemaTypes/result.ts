export default {
  name: 'result',
  title: 'Result',
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
    { name: 'homeScore', title: 'Home Score', type: 'number' },
    { name: 'awayScore', title: 'Away Score', type: 'number' },
    { name: 'date',      title: 'Match Date', type: 'datetime' },
    {
      name: 'outcome',
      title: 'Outcome',
      type: 'string',
      options: { list: ['win', 'draw', 'loss'] },
    },
    { name: 'report', title: 'Match Report', type: 'text' },
  ],
  preview: {
    select: {
      home: 'homeTeam.name',
      away: 'awayTeam.name',
      homeScore: 'homeScore',
      awayScore: 'awayScore',
    },
    prepare({ home, away, homeScore, awayScore }: any) {
      return { title: `${home} ${homeScore} - ${awayScore} ${away}` };
    },
  },
}
