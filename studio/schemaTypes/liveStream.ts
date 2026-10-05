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
    {
      name: 'likes',
      title: 'Likes',
      type: 'number',
      initialValue: 0,
      readOnly: true,
    },
    {
      name: 'dislikes',
      title: 'Dislikes',
      type: 'number',
      initialValue: 0,
      readOnly: true,
    },
    {
      name: 'views',
      title: 'Views',
      type: 'number',
      initialValue: 0,
      readOnly: true,
    },
    {
      name: 'comments',
      title: 'Comments',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'comment',
          fields: [
            { name: 'author', type: 'string', title: 'Author' },
            { name: 'text', type: 'text', title: 'Text' },
            { name: 'createdAt', type: 'datetime', title: 'Created At' },
          ],
          preview: { select: { title: 'author', subtitle: 'text' } },
        },
      ],
    },
  ],
  preview: {
    select: { title: 'matchTitle', subtitle: 'isLive' },
    prepare({ title, subtitle }: any) {
      return { title, subtitle: subtitle ? '🔴 LIVE' : 'Offline' };
    },
  },
};