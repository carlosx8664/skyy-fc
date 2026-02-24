export default {
  name: 'player',
  title: 'Player',
  type: 'document',
  fields: [
    { name: 'name',     title: 'Full Name',    type: 'string' },
    { name: 'number',   title: 'Jersey Number', type: 'number' },
    { name: 'position', title: 'Position',     type: 'string',
      options: { list: ['Goalkeeper','Defender','Midfielder','Forward'] }
    },
    { name: 'photo',    title: 'Photo',        type: 'image',
      options: { hotspot: true }
    },
    { name: 'nationality', title: 'Nationality', type: 'string' },
    { name: 'age',      title: 'Age',          type: 'number' },
  ]
}
