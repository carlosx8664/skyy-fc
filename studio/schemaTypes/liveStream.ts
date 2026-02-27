export default {
  name: 'liveStream',
  title: 'Live Stream',
  type: 'document',
  fields: [
    {
      name: 'isLive',
      title: 'Stream is Live',
      type: 'boolean',
      description: 'Toggle this ON when a match is live',
    },
    {
      name: 'youtubeUrl',
      title: 'YouTube Live URL',
      type: 'url',
      description: 'e.g. https://www.youtube.com/watch?v=XXXX or https://youtu.be/XXXX',
    },
    {
      name: 'matchTitle',
      title: 'Match Title',
      type: 'string',
      description: 'e.g. SKYY FC vs Police National — Matchday 21',
    },
  ],
  preview: {
    select: { title: 'matchTitle', subtitle: 'isLive' },
    prepare({ title, subtitle }: any) {
      return { title, subtitle: subtitle ? '🔴 LIVE' : 'Offline' };
    },
  },
}
