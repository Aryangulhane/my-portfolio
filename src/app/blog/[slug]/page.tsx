import { client, urlForImage } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { notFound } from 'next/navigation'

interface Post {
  _id: string
  title: string
  slug: { current: string }
  mainImage?: any
  publishedAt: string
  body: any
  categories?: string[]
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const query = `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      body,
      "categories": categories[]->title
    }`
    
    return await client.fetch(query, { slug })
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 dark:text-white">{post.title}</h1>
        <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 mb-8">
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString()}
          </time>
          {post.categories && post.categories.length > 0 && (
            <div className="flex gap-2">
              {post.categories.map((category: string) => (
                <span 
                  key={category} 
                  className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm"
                >
                  {category}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {post.mainImage && (
          <div className="relative w-full h-96 mb-8">
            <Image
              src={urlForImage(post.mainImage)?.url() || ''}
              alt={post.title}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>
        )}
        
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <PortableText value={post.body} />
        </div>
      </div>
    </article>
  )
} 