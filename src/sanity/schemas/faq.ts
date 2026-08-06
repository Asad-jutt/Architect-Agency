export default {
  name: 'faq',
  title: 'Frequently Asked Questions',
  type: 'document',
  fields: [
    {
      name: 'question',
      title: 'Question',
      type: 'string',
    },
    {
      name: 'answer',
      title: 'Answer',
      type: 'text',
    },
    {
      name: 'category',
      title: 'System Tag / Category',
      type: 'string',
    },
    {
      name: 'rowOrder',
      title: 'Row Index (1, 2, or 3)',
      type: 'number',
    },
  ],
};
