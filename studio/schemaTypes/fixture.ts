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

    // ── Popup poster ────────────────────────────────────────────
    {
      name: 'poster',
      title: 'Match Poster (Popup)',
      description: 'Upload the JPEG poster for the popup. Leave empty to disable the popup for this fixture.',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'showPopup',
      title: 'Show Popup for this Fixture',
      description: 'Toggle off to hide the popup even if a poster is uploaded.',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      home: 'homeTeam.name',
      away: 'awayTeam.name',
      date: 'date',
      media: 'poster',
    },
    prepare({ home, away, date, media }: any) {
      const d = date ? new Date(date).toLocaleDateString('en-GB') : 'TBD';
      return { title: `${home} vs ${away}`, subtitle: d, media };
    },
  },
}