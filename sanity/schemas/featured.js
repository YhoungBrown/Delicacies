import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'featured',
  title: 'Featured Menu Categories',
  type: 'document',
  fields: [
    {
      name: "name",
      type: "string",
      title: "Featured Category Name",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "short_discription",
      type: "string",
      title: "Short discription",
      validation: (Rule) => Rule.max(200),
    },
    {
      name: "restaurants",
      type: "array",
      title: "Restaurants",
      of: [{type: "reference", to: [{type: "restaurant"}] }]
    },
  ],
})
