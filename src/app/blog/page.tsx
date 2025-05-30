import { client, urlForImage } from '@/lib/sanity'
import Link from 'next/link'
import Image from 'next/image'

async function getPosts() {
  try {
    const query = `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      excerpt
    }`
    
    return await client.fetch(query)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export default async function BlogPage() {
  const posts = await getPosts()

  if (!posts || posts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No blog posts found.</p>
          <p className="text-sm text-gray-500 mt-2">
            Please add some posts through the Sanity Studio.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post: any) => (
          <Link 
            href={`/blog/${post.slug.current}`} 
            key={post._id}
            className="group"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 group-hover:scale-105">
              {post.mainImage && (
                <div className="relative h-48 w-full">
                  <Image 
                    src={urlForImage(post.mainImage)?.url() || ''}
                    alt={post.title || 'Blog post image'}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 dark:text-white">{post.title}</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {new Date(post.publishedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
} 