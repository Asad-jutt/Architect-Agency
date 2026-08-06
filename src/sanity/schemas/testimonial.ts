export default {
  name: 'testimonial',
  title: 'Client Testimonials',
  type: 'document',
  fields: [
    {
      name: 'author',
      title: 'Author Name',
      type: 'string',
    },
    {
      name: 'role',
      title: 'Role / Company',
      type: 'string',
    },
    {
      name: 'quote',
      title: 'Quote',
      type: 'text',
    },
    {
      name: 'trackTitle',
      title: 'Cassette Track Title',
      type: 'string',
    },
    {
      name: 'avatar',
      title: 'Avatar Image',
      type: 'image',
    },
  ],
};
