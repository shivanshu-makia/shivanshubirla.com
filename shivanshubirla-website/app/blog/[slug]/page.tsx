import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Instagram, Linkedin } from 'lucide-react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'

const postsDirectory = path.join(process.cwd(), 'content/posts')

function getPostBySlug(slug: string) {
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

function getAllPostSlugs() {
  try {
    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames
      .filter((fileName) => fileName.endsWith('.mdx'))
      .map((fileName) => fileName.replace(/\.mdx$/, ''))
  } catch {
    return []
  }
}

export function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) {
    return { title: 'Post Not Found' }
  }
  return {
    title: `${post.title} | Shivanshu Birla`,
    description: post.excerpt,
  }
}

const components = {
  h1: (props: any) => <h1 className="font-display text-4xl md:text-5xl text-text mt-12 mb-6" {...props} />,
  h2: (props: any) => <h2 className="font-display text-3xl text-text mt-10 mb-4" {...props} />,
  h3: (props: any) => <h3 className="font-display text-2xl text-text mt-8 mb-3" {...props} />,
  p: (props: any) => <p className="font-body text-text/80 leading-relaxed mb-6" style={{ lineHeight: '1.85' }} {...props} />,
  ul: (props: any) => <ul className="font-body text-text/80 mb-6 space-y-2 ml-6 list-disc" {...props} />,
  ol: (props: any) => <ol className="font-body text-text/80 mb-6 space-y-2 ml-6 list-decimal" {...props} />,
  li: (props: any) => <li className="leading-relaxed" style={{ lineHeight: '1.85' }} {...props} />,
  blockquote: (props: any) => <blockquote className="font-body italic text-text/70 border-l-2 border-gold pl-6 my-8" {...props} />,
  strong: (props: any) => <strong className="font-medium text-text" {...props} />,
  a: (props: any) => <a className="text-gold hover:text-gold-dark underline transition-colors" {...props} />,
  hr: () => <hr className="border-t border-thin my-12" />,
  code: (props: any) => <code className="font-mono text-sm bg-cream px-1.5 py-0.5 rounded-sm" {...props} />,
  pre: (props: any) => <pre className="font-mono text-sm bg-cream p-6 overflow-x-auto mb-6 rounded-sm" {...props} />,
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <main className="min-h-screen bg-cream">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-cream/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="font-mono text-sm tracking-wide text-text">
            SB
          </Link>
          <div className="flex gap-8">
            <Link href="/#about" className="font-mono text-sm tracking-wide text-text hover:text-gold transition-colors">
              About
            </Link>
            <Link href="/blog" className="font-mono text-sm tracking-wide text-gold">
              Writing
            </Link>
            <Link href="/#contact" className="font-mono text-sm tracking-wide text-text hover:text-gold transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* Article */}
      <article className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-sm text-text/50 hover:text-gold transition-colors mb-12"
          >
            <ArrowLeft size={14} />
            Back to writing
          </Link>

          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-xs text-gold px-2 py-1 bg-gold/10 rounded-sm">
                {post.category}
              </span>
              <span className="font-mono text-xs text-text/50">
                {formatDate(post.date)}
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl text-text mb-4">
              {post.title}
            </h1>
            <p className="font-body text-lg text-text/60 italic">
              {post.excerpt}
            </p>
          </header>

          {/* Content */}
          <div className="prose-custom">
            <MDXRemote source={post.content} components={components} />
          </div>

          {/* Author */}
          <footer className="mt-16 pt-8 border-t border-thin">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center">
                <span className="font-display text-2xl text-gold">SB</span>
              </div>
              <div>
                <h4 className="font-display text-xl text-text mb-1">Shivanshu Birla</h4>
                <p className="font-body text-sm text-text/60 mb-3">
                  Founding Partner at Makia Capital, a SEBI-registered AIF and boutique investment bank. Alumnus of the Indian School of Business (ISB) and CFA Charterholder.
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://instagram.com/birlashivanshu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text/40 hover:text-gold transition-colors"
                  >
                    <Instagram size={18} />
                  </a>
                  <a
                    href="https://linkedin.com/in/birlashivanshu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text/40 hover:text-gold transition-colors"
                  >
                    <Linkedin size={18} />
                  </a>
                </div>
              </div>
            </div>

            {/* Newsletter signup */}
            <div className="mt-12 pt-12 border-t border-text/10">
              <div className="max-w-md">
                <h4 className="font-display text-xl text-text mb-2">Get new essays in your inbox.</h4>
                <p className="font-body text-sm text-text/50 mb-5">No noise. Just writing, when it's ready.</p>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault()
                    const form = e.currentTarget
                    const email = (form.elements.namedItem('email') as HTMLInputElement).value
                    try {
                      await fetch('/api/newsletter', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email }),
                      })
                      form.reset()
                      alert('You\'re subscribed!')
                    } catch {
                      alert('Something went wrong. Please try again.')
                    }
                  }}
                  className="flex gap-3"
                >
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="your@email.com"
                    className="flex-1 px-4 py-2.5 bg-transparent border border-text/20 text-text placeholder:text-text/30 font-mono text-sm focus:outline-none focus:border-gold transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-gold text-white font-mono text-xs tracking-wider hover:bg-gold-dark transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </footer>
        </div>
      </article>

      {/* Footer */}
      <footer className="bg-darker py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-display text-white text-lg">Shivanshu Birla</span>
          
          <div className="flex gap-8">
            <Link href="/#about" className="font-mono text-xs text-white/50 hover:text-gold transition-colors">
              About
            </Link>
            <Link href="/blog" className="font-mono text-xs text-white/50 hover:text-gold transition-colors">
              Writing
            </Link>
            <Link href="/#contact" className="font-mono text-xs text-white/50 hover:text-gold transition-colors">
              Contact
            </Link>
          </div>

          <span className="font-mono text-xs text-white/30">
            © 2025 Shivanshu Birla
          </span>
        </div>
      </footer>
    </main>
  )
}
