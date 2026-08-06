export default {
  name: 'project',
  title: 'Selected Projects',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
    },
    {
      name: 'subtitle',
      title: 'Subtitle / Category',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'year',
      title: 'Year',
      type: 'string',
    },
    {
      name: 'mainImage',
      title: 'Main Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'liveUrl',
      title: 'Live Preview URL',
      type: 'url',
    },
    {
      name: 'orderAsc',
      title: 'Display Order',
      type: 'number',
    },
  ],
};
