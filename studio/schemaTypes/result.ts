export default {
  name: 'result',
  title: 'Result',
  type: 'document',
  fields: [
    {
      name: 'matchday',
      title: 'Matchday #',
      type: 'number',
      description: 'Which round of the season this match belongs to.',
      validation: (Rule: any) => Rule.min(1).max(40),
    },
    {
      name: 'homeTeam',
      title: 'Home Team',
      type: 'reference',
      to: [{ type: 'team' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'awayTeam',
      title: 'Away Team',
      type: 'reference',
      to: [{ type: 'team' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'homeScore',
      title: 'Home Score',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(0).integer(),
    },
    {
      name: 'awayScore',
      title: 'Away Score',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(0).integer(),
    },
    {
      name: 'date',
      title: 'Match Date',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'outcome',
      title: 'Outcome (Skyy FC only)',
      description: 'Only relevant when Skyy FC is playing. Used for the "Latest Result" badge.',
      type: 'string',
      options: {
        list: [
          { title: 'Win',  value: 'win' },
          { title: 'Draw', value: 'draw' },
          { title: 'Loss', value: 'loss' },
        ],
      },
      hidden: ({ document }: any) => {
        // Only show outcome field if Skyy FC is one of the teams.
        // Requires your Skyy FC team doc _id — see note below.
        return true; // <-- replace with real check, or just leave always visible
      },
    },
    {
      name: 'report',
      title: 'Match Report',
      type: 'text',
      rows: 4,
    },
  ],
  orderings: [
    {
      title: 'Matchday (newest first)',
      name: 'matchdayDesc',
      by: [{ field: 'matchday', direction: 'desc' }],
    },
    {
      title: 'Date (newest first)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      matchday: 'matchday',
      home: 'homeTeam.name',
      away: 'awayTeam.name',
      homeScore: 'homeScore',
      awayScore: 'awayScore',
    },
    prepare({ matchday, home, away, homeScore, awayScore }: any) {
      const md = matchday ? `MD${matchday}: ` : '';
      return {
        title: `${md}${home} ${homeScore} - ${awayScore} ${away}`,
      };
    },
  },
}