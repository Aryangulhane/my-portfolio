import { client, urlForImage } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { PageProps } from 'next'

async function getPost(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    body,
    "categories": categories[]->title
  }`
  
  const post = await client.fetch(query, { slug })
  
  if (!post) {
    notFound()
  }
  
  return post
}

export default async function BlogPost({ params }: PageProps) {
  const post = await getPost(params.slug)

  return (
    <article className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-gray-600 mb-8">
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString()}
          </time>
          {post.categories && (
            <div className="flex gap-2">
              {post.categories.map((category: string) => (
                <span key={category} className="bg-gray-100 px-2 py-1 rounded">
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
            />
          </div>
        )}
        
        <div className="prose prose-lg max-w-none">
          <PortableText value={post.body} />
        </div>
      </div>
    </article>
  )
} 