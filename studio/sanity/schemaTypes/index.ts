
export const schema = {
  types: [
    {
      name: 'post',
      type: 'document',
      title: 'Post',
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Title',
          validation: (rule: any) => rule.required()
        },
        {
          name: 'slug',
          type: 'slug',
          title: 'Slug',
          options: {
            source: 'title',
            maxLength: 200
          },
          validation: (rule: any) => rule.required()
        },
        {
          name: 'mainImage',
          type: 'image',
          title: 'Main Image',
          options: {
            hotspot: true
          }
        },
        {
          name: 'publishedAt',
          type: 'datetime',
          title: 'Published At',
          validation: (rule: any) => rule.required()
        },
        {
          name: 'excerpt',
          type: 'text',
          title: 'Excerpt',
          rows: 3
        },
        {
          name: 'body',
          type: 'array',
          title: 'Body',
          of: [
            {
              type: 'block'
            },
            {
              type: 'image',
              options: {
                hotspot: true
              }
            }
          ]
        },
        {
          name: 'categories',
          type: 'array',
          title: 'Categories',
          of: [
            {
              type: 'reference',
              to: [{type: 'category'}]
            }
          ]
        }
      ]
    },
    {
      name: 'category',
      type: 'document',
      title: 'Category',
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Title',
          validation: (rule: any) => rule.required()
        },
        {
          name: 'description',
          type: 'text',
          title: 'Description'
        }
      ]
    }
  ]
}
