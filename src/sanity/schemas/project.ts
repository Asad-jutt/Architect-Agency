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
      name: 'number',
      title: 'Record Number (e.g. 01)',
      type: 'string',
    },
    {
      name: 'subtitle',
      title: 'Subtitle / Category Line',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
    },
    {
      name: 'fullOverview',
      title: 'Full Overview',
      type: 'text',
    },
    {
      name: 'challenge',
      title: 'Challenge',
      type: 'text',
    },
    {
      name: 'solution',
      title: 'Solution',
      type: 'text',
    },
    {
      name: 'year',
      title: 'Year',
      type: 'string',
    },
    {
      name: 'client',
      title: 'Client',
      type: 'string',
    },
    {
      name: 'accentColor',
      title: 'Accent Color',
      type: 'string',
      options: {
        list: ['#C6FF00', '#FF007F', '#00FFFF', '#FFFFFF'],
      },
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
      name: 'galleryImages',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'tags',
      title: 'Tags (e.g. WEBFLOW, EXPERIMENTAL)',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'techFramework',
      title: 'Tech: Framework',
      type: 'string',
    },
    {
      name: 'techStyling',
      title: 'Tech: Styling',
      type: 'string',
    },
    {
      name: 'techAnimations',
      title: 'Tech: Animations',
      type: 'string',
    },
    {
      name: 'performanceScore',
      title: 'Performance Score',
      type: 'string',
    },
    {
      name: 'hosting',
      title: 'Hosting',
      type: 'string',
    },
    {
      name: 'metrics',
      title: 'Metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'value', title: 'Value', type: 'string' },
          ],
        },
      ],
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
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
  },
};
