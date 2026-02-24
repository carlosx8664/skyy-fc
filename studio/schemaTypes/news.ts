export default {
  name: 'news',
  title: 'News',
  type: 'document',
  fields: [
    { name: 'title',   title: 'Title',        type: 'string' },
    { name: 'date',    title: 'Publish Date', type: 'datetime' },
    {
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    },
    { name: 'excerpt', title: 'Excerpt',      type: 'text' },
    {
      name: 'body',
      title: 'Full Article',
      type: 'array',
      of: [{ type: 'block' }],
    },
    { name: 'author',  title: 'Author',       type: 'string' },
    {
      name: 'videoUrl',
      title: 'YouTube Video URL',
      type: 'url',
      description: 'Paste any YouTube URL — e.g. https://www.youtube.com/watch?v=abc123 or https://youtu.be/abc123',
    },
  ],
}
