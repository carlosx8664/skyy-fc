export default {
  name: 'news',
  title: 'News',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Used for the shareable URL. Click "Generate" from the title.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required().error('Slug is required for the shareable link'),
    },
    {
      name: 'date',
      title: 'Publish Date',
      type: 'datetime',
    },
    {
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'showCoverImage',
      title: 'Show Cover Image Inside Article',
      type: 'boolean',
      description: 'Toggle ON to display the cover photo at the top of the article body.',
      initialValue: true,
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
    },
    {
      name: 'body',
      title: 'Full Article',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
    },
    {
      name: 'videoUrl',
      title: 'YouTube Video URL',
      type: 'url',
      description: 'Paste any YouTube URL — e.g. https://www.youtube.com/watch?v=abc123 or https://youtu.be/abc123',
    },
    {
      name: 'season',
      title: 'Season',
      type: 'string',
      description: 'Select the season this match belongs to',
      options: {
        list: [
          { title: '2025/26', value: '2025/26' },
          { title: '2026/27', value: '2026/27' },
          { title: '2027/28', value: '2027/28' },
        ],
        layout: 'dropdown',
      },
      initialValue: '2026/27',
      validation: (Rule: any) => Rule.required().error('Season is required for match organization'),
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
  orderings: [
    {
      title: 'Date, Newest First',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
    {
      title: 'Season, Newest First',
      name: 'seasonDesc',
      by: [
        { field: 'season', direction: 'desc' },
        { field: 'date', direction: 'desc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'season',
      media: 'image',
      date: 'date',
    },
    prepare(selection: any) {
      const { title, subtitle, media, date } = selection;
      return {
        title: title || 'Untitled',
        subtitle: subtitle
          ? `${subtitle} • ${date ? new Date(date).toLocaleDateString() : 'No date'}`
          : 'No season assigned',
        media: media,
      };
    },
  },
};