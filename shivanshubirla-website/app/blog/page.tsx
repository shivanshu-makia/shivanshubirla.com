'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowLeft, Instagram } from 'lucide-react'

const categories = [
  'All',
  'Investments',
  'Life',
  'Travel',
  'Fitness & Spirituality',
  'Giving Back',
]

// Hardcoded posts for now - in production this would come from MDX
const allPosts = [
  {
    slug: 'tips-cant-be-your-thesis',
    title: "Tips Can't Be Your Thesis",
    date: '2026-03-29',
    category: 'Investments',
    excerpt: 'The market humbles everyone. What you do with that humbling is the only question that matters.',
  },
  {
    slug: 'why-i-started-this-site',
    title: 'Why I started this site',
    date: '2026-03-27',
    category: 'Life',
    excerpt: 'A place to keep a record of thoughts, insights, and things I\'m learning — in no particular order.',
  }
]

const fadeUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const slideInLeft = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [scrolled, setScrolled] = useState(false)
  const [email, setEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [newsletterMessage, setNewsletterMessage] = useState('')

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setNewsletterStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      const data = await res.json()
      
      if (res.ok) {
        setNewsletterStatus('success')
        setNewsletterMessage(data.message)
        setEmail('')
      } else {
        setNewsletterStatus('error')
        setNewsletterMessage(data.error)
      }
    } catch {
      setNewsletterStatus('error')
      setNewsletterMessage('Something went wrong. Please try again.')
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const filteredPosts = activeCategory === 'All'
    ? allPosts
    : allPosts.filter(post => post.category === activeCategory)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase()
    return { day, month }
  }

  return (
    <main className="min-h-screen bg-cream">
      {/* Navbar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300"
        initial={{ backgroundColor: 'rgba(250, 248, 244, 0)' }}
        animate={{
          backgroundColor: scrolled ? 'rgba(250, 248, 244, 0.95)' : 'rgba(250, 248, 244, 0)',
          backdropFilter: scrolled ? 'blur(10px)' : 'blur(0px)',
        }}
      >
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
      </motion.nav>

      {/* Header */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUpVariant}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-sm text-text/50 hover:text-gold transition-colors mb-8"
            >
              <ArrowLeft size={14} />
              Back home
            </Link>
            <h1 className="font-display text-5xl md:text-6xl text-text mb-4">
              Writing
            </h1>
            <p className="font-body text-text/60 text-lg">
              Thoughts, insights, and things I'm learning — in no particular order.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-16 z-40 bg-cream/95 backdrop-blur-sm border-b border-thin py-4 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`font-mono text-xs px-4 py-2 transition-colors ${
                  activeCategory === category
                    ? 'bg-text text-cream'
                    : 'bg-white text-text/60 hover:text-text'
                }`}
                style={{ borderRadius: '2px' }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Posts List */}
            <div className="lg:col-span-2">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="space-y-2"
              >
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post, index) => {
                    const { day, month } = formatDate(post.date)
                    return (
                      <motion.div
                        key={post.slug}
                        variants={slideInLeft}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Link
                          href={`/blog/${post.slug}`}
                          className="group flex items-start gap-6 py-6 border-b border-thin hover:bg-white/50 transition-colors px-4 -mx-4"
                        >
                          {/* Date */}
                          <div className="flex-shrink-0 w-16 text-center">
                            <span className="font-display text-3xl text-text block">{day}</span>
                            <span className="font-mono text-xs text-text/50">{month}</span>
                          </div>

                          {/* Category */}
                          <span className="flex-shrink-0 font-mono text-xs text-gold px-2 py-1 bg-gold/10 rounded-sm">
                            {post.category}
                          </span>

                          {/* Content */}
                          <div className="flex-grow">
                            <h3 className="font-display text-xl text-text group-hover:text-gold transition-colors mb-1">
                              {post.title}
                            </h3>
                            <p className="font-body text-sm text-text/60">{post.excerpt}</p>
                          </div>

                          {/* Arrow */}
                          <ArrowRight
                            size={16}
                            className="flex-shrink-0 text-text/30 group-hover:text-gold group-hover:translate-x-1 transition-all mt-1"
                          />
                        </Link>
                      </motion.div>
                    )
                  })
                ) : (
                  <div className="text-center py-12">
                    <p className="font-body text-text/50">No posts in this category yet.</p>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUpVariant}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="sticky top-32 space-y-8"
              >
                {/* Bio */}
                <div className="bg-white p-6 border-thin" style={{ borderRadius: '2px' }}>
                  <h3 className="font-display text-xl text-text mb-3">About</h3>
                  <p className="font-body text-sm text-text/70 leading-relaxed mb-4">
                    I'm Shivanshu — investor, reader, traveler. This is where I write about things I'm learning.
                  </p>
                  <Link
                    href="/#about"
                    className="font-mono text-xs text-gold hover:text-gold-dark transition-colors"
                  >
                    Read more →
                  </Link>
                </div>

                {/* Instagram */}
                <div className="bg-white p-6 border-thin" style={{ borderRadius: '2px' }}>
                  <h3 className="font-display text-xl text-text mb-3">Instagram</h3>
                  <a
                    href="https://instagram.com/birlashivanshu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-mono text-sm text-gold hover:text-gold-dark transition-colors"
                  >
                    <Instagram size={16} />
                    @birlashivanshu
                  </a>
                </div>

                {/* Newsletter */}
                <div className="bg-white p-6 border-thin" style={{ borderRadius: '2px' }}>
                  <h3 className="font-display text-xl text-text mb-3">Newsletter</h3>
                  <p className="font-body text-sm text-text/70 mb-4">
                    Get notified when I publish something new.
                  </p>
                  {newsletterStatus === 'success' ? (
                    <p className="font-mono text-sm text-gold">{newsletterMessage}</p>
                  ) : (
                    <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full font-mono text-sm px-4 py-2 border border-thin bg-cream focus:outline-none focus:border-gold"
                        style={{ borderRadius: '2px' }}
                        disabled={newsletterStatus === 'loading'}
                      />
                      <button
                        type="submit"
                        disabled={newsletterStatus === 'loading'}
                        className="w-full font-mono text-sm px-4 py-2 bg-text text-cream hover:bg-gold transition-colors disabled:opacity-50"
                        style={{ borderRadius: '2px' }}
                      >
                        {newsletterStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
                      </button>
                      {newsletterStatus === 'error' && (
                        <p className="font-mono text-xs text-red-500">{newsletterMessage}</p>
                      )}
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-darker py-8 px-6 mt-24">
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
