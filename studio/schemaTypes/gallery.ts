export default {
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Album Title',
      type: 'string',
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'date',
      title: 'Date',
      type: 'datetime',
    },
    {
      name: 'matchday',
      title: 'Matchday #',
      type: 'number',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Match Highlights', value: 'highlights' },
          { title: 'Training',         value: 'training' },
          { title: 'Behind the Scenes', value: 'bts' },
          { title: 'Fan Zone',         value: 'fans' },
          { title: 'Other',            value: 'other' },
        ],
      },
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      options: {
        layout: 'grid',  // ← shows thumbnails in studio, not a list
      },
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      subtitle: 'date',
    },
    prepare({ title, media, subtitle }: any) {
      const d = subtitle ? new Date(subtitle).toLocaleDateString('en-GB') : '';
      return { title, media, subtitle: d };
    },
  },
}
