export default {
  name: 'stories',
  title: 'Stories',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'date', title: 'Publish Date', type: 'datetime' },
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
    { name: 'excerpt', title: 'Excerpt', type: 'text' },
    {
      name: 'body',
      title: 'Full Article',
      type: 'array',
      of: [{ type: 'block' }],
    },
    { name: 'author', title: 'Author', type: 'string' },
  ],
  preview: {
    select: { title: 'title', subtitle: 'author', media: 'image' },
  },
};
