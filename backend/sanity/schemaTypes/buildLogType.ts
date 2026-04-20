// backend/sanity/schemaTypes/buildLogType.ts
import { defineField, defineType } from 'sanity'

export const buildLogType = defineType({
  name: 'buildLog',
  title: 'Build Log',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: '🧠 Planning', value: 'planning' },
          { title: '🔧 In Progress', value: 'in-progress' },
          { title: '✅ Done', value: 'done' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'description',
      title: 'What I did / learned',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: ['ESP32', 'Arduino', 'Drone', 'PCB', 'Sensors', 'Power', 'Bluetooth', 'IoT', 'Robotics'],
        layout: 'tags',
      },
    }),
  ],
  orderings: [
    {
      title: 'Date, Newest First',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'date', status: 'status' },
    prepare({ title, subtitle, status }) {
      const emoji = status === 'done' ? '✅' : status === 'in-progress' ? '🔧' : '🧠'
      return { title: `${emoji} ${title}`, subtitle }
    },
  },
})
