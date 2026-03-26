import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface PostMeta {
  slug: string
  title: string
  date: string
  category: string
  excerpt: string
}

export interface Post extends PostMeta {
  content: string
}

export function getAllPosts(): PostMeta[] {
  // Ensure the directory exists
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)

      return {
        slug,
        title: data.title || '',
        date: data.date || '',
        category: data.category || '',
        excerpt: data.excerpt || '',
      }
    })

  // Sort by date descending
  return allPosts.sort((a, b) => {
    if (a.date < b.date) return 1
    if (a.date > b.date) return -1
    return 0
  })
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      category: data.category || '',
      excerpt: data.excerpt || '',
      content,
    }
  } catch {
    return null
  }
}

export function getPostsByCategory(category: string): PostMeta[] {
  const allPosts = getAllPosts()
  if (category === 'All') return allPosts
  return allPosts.filter((post) => post.category === category)
}

export const categories = [
  'All',
  'Investments',
  'Life',
  'Travel',
  'Fitness & Spirituality',
  'Giving Back',
]
