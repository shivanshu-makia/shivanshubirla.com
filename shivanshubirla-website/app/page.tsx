'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Instagram, Linkedin, ArrowRight, Mail } from 'lucide-react'

// Animation variants
const fadeUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const slideInLeft = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
}

// Navbar Component
function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300"
      initial={{ backgroundColor: 'rgba(250, 248, 244, 0)' }}
      animate={{
        backgroundColor: scrolled ? 'rgba(250, 248, 244, 0.95)' : 'rgba(250, 248, 244, 0)',
        backdropFilter: scrolled ? 'blur(10px)' : 'blur(0px)',
      }}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className={`font-mono text-sm tracking-wide ${scrolled ? 'text-text' : 'text-white'}`}>
          SB
        </Link>
        <div className="flex gap-8">
          <Link href="/#about" className={`font-mono text-sm tracking-wide hover:text-gold transition-colors ${scrolled ? 'text-text' : 'text-white'}`}>
            About
          </Link>
          <Link href="/blog" className={`font-mono text-sm tracking-wide hover:text-gold transition-colors ${scrolled ? 'text-text' : 'text-white'}`}>
            Writing
          </Link>
          <Link href="/#contact" className={`font-mono text-sm tracking-wide hover:text-gold transition-colors ${scrolled ? 'text-text' : 'text-white'}`}>
            Contact
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}

// Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-end">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero.jpg"
          alt="Bali cliffs landscape"
          fill
          priority
          className="object-cover hero-image"
          style={{ objectPosition: 'center 65%' }}
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Eyebrow */}
            <motion.p
              variants={fadeUpVariant}
              transition={{ duration: 0.6 }}
              className="font-mono text-gold text-sm tracking-wider mb-4"
            >
              Delhi, India
            </motion.p>

            {/* Name */}
            <motion.h1
              variants={fadeUpVariant}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display text-white leading-none mb-6"
              style={{ fontSize: 'clamp(52px, 7vw, 96px)' }}
            >
              <span className="font-light">Shivanshu</span>
              <br />
              <span className="font-semibold">Birla</span>
            </motion.h1>

            {/* Gold divider */}
            <motion.div
              variants={fadeUpVariant}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-10 h-px bg-gold mb-6"
            />

            {/* Tagline */}
            <motion.p
              variants={fadeUpVariant}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="font-body text-white/90 text-lg italic mb-8"
            >
              Student of life. Avid investor. Aspirational reader.
            </motion.p>

            {/* Social row */}
            <motion.div
              variants={fadeUpVariant}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap items-center gap-6"
            >
              <a
                href="https://instagram.com/birlashivanshu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/80 hover:text-gold transition-colors font-mono text-sm"
              >
                <Instagram size={16} />
                @birlashivanshu
              </a>
              <a
                href="https://linkedin.com/in/birlashivanshu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/80 hover:text-gold transition-colors font-mono text-sm"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
              <Link
                href="/blog"
                className="flex items-center gap-2 text-white/80 hover:text-gold transition-colors font-mono text-sm"
              >
                Writing
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// About Section
function AboutSection() {
  return (
    <section id="about" className="bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-16"
        >
          {/* Left Column */}
          <div>
            <h2 className="font-display text-4xl md:text-5xl text-text mb-8">
              Just another boy who showed up.
            </h2>
            <blockquote className="font-body italic text-text/70 text-lg border-l-2 border-gold pl-6">
              "Somehow the dots connected. Still figuring out what comes next."
            </blockquote>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <p className="font-body text-text/80 leading-relaxed" style={{ lineHeight: '1.85' }}>
              I grew up ambitious — not entirely sure where I was headed, but certain I wanted to get somewhere. I worked hard even when I thought nothing would come of it, found myself at the right places at the right times, and somehow the dots connected.
            </p>
            <p className="font-body text-text/80 leading-relaxed" style={{ lineHeight: '1.85' }}>
              I invest in companies and people. I read — or try to, more than I manage. I travel when I can. I believe the world outside your city teaches things no classroom will.
            </p>
            <p className="font-body text-text/80 leading-relaxed" style={{ lineHeight: '1.85' }}>
              This site is my attempt to keep a record — of thoughts, insights, things I'm learning — in no particular order. Always happy to talk, and always happy to see if I can help in any way.
            </p>
          </div>
        </motion.div>

        {/* Tags */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariant}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 pt-8 border-t border-thin"
        >
          <div className="flex flex-wrap gap-4">
            {['ISB · CFA', 'Investor', 'Founder', 'Reader', 'Traveler', 'Motor-head', 'Delhi 🇮🇳'].map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs text-text/60 px-3 py-1.5 bg-cream rounded-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Passions Section
function PassionsSection() {
  const passions = [
    {
      emoji: '📈',
      title: 'Investments',
      description: "Markets, founders, ideas. I believe investing is one of the most honest ways to take a bet on the future. I've backed companies and learned more from my mistakes than my wins."
    },
    {
      emoji: '🕉️',
      title: 'Fitness & Spirituality',
      description: 'The body and the mind are the same project. Yoga, movement, stillness — sometimes all three in the same morning. A practice, not a performance.'
    },
    {
      emoji: '🤝',
      title: 'Giving Back',
      description: "Whatever I can. A conversation, a connection, a perspective. If someone reaches out and I can be useful in any way — that's worth more than most things."
    }
  ]

  return (
    <section className="bg-cream py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariant}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl md:text-5xl text-text mb-16"
        >
          Passionate about.
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8"
        >
          {passions.map((passion, index) => (
            <motion.div
              key={passion.title}
              variants={fadeUpVariant}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-white p-8 border-thin hover:shadow-lg transition-shadow"
              style={{ borderRadius: '2px' }}
            >
              <span className="text-3xl mb-4 block">{passion.emoji}</span>
              <h3 className="font-display text-2xl text-text mb-4">{passion.title}</h3>
              <p className="font-body text-text/70 leading-relaxed" style={{ lineHeight: '1.85' }}>
                {passion.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Instagram Section
function InstagramSection() {
  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariant}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl text-text">
            On Instagram
          </h2>
          <a
            href="https://instagram.com/birlashivanshu"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gold hover:text-gold-dark transition-colors font-mono text-sm"
          >
            @birlashivanshu
            <ArrowRight size={14} />
          </a>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="aspect-square bg-cream flex items-center justify-center"
              style={{ borderRadius: '2px' }}
            >
              {/* Replace with Elfsight embed or real photos */}
              <span className="text-text/30 font-mono text-xs">Photo {i}</span>
            </motion.div>
          ))}
        </motion.div>

        <p className="mt-8 text-center font-mono text-xs text-text/50">
          {/* To connect Instagram: Add Elfsight widget or replace with actual photos */}
          Connect via Elfsight or add photos directly
        </p>
      </div>
    </section>
  )
}

// Recent Writing Section
function RecentWritingSection() {
  // Hardcoded for now - in production this would come from MDX
  const posts = [
    {
      slug: 'why-i-started-this-site',
      title: 'Why I started this site',
      date: '2025-06-26',
      category: 'Life',
      excerpt: 'A place to keep a record of thoughts, insights, and things I\'m learning — in no particular order.'
    }
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase()
    return { day, month }
  }

  return (
    <section className="bg-cream py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariant}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl text-text">
            Recent Writing
          </h2>
          <Link
            href="/blog"
            className="flex items-center gap-2 text-gold hover:text-gold-dark transition-colors font-mono text-sm"
          >
            View all
            <ArrowRight size={14} />
          </Link>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="space-y-6"
        >
          {posts.map((post, index) => {
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
          })}
        </motion.div>
      </div>
    </section>
  )
}

// Contact Section
function ContactSection() {
  return (
    <section id="contact" className="bg-dark py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariant}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
            Always happy to connect.
          </h2>
          <p className="font-body text-white/70 text-lg mb-12" style={{ lineHeight: '1.85' }}>
            Whether you're a founder, a fellow traveler, someone who read something here, or just want to say hello — reach out. I read everything.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:shivanshu@makiacapital.com"
              className="inline-flex items-center gap-2 font-mono text-sm px-6 py-3 bg-gold text-dark hover:bg-gold-dark transition-colors"
              style={{ borderRadius: '2px' }}
            >
              <Mail size={16} />
              Say hello
            </a>
            <a
              href="https://linkedin.com/in/birlashivanshu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-sm px-6 py-3 border border-white/30 text-white hover:border-gold hover:text-gold transition-colors"
              style={{ borderRadius: '2px' }}
            >
              <Linkedin size={16} />
              LinkedIn
            </a>
            <a
              href="https://instagram.com/birlashivanshu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-sm px-6 py-3 border border-white/30 text-white hover:border-gold hover:text-gold transition-colors"
              style={{ borderRadius: '2px' }}
            >
              <Instagram size={16} />
              Instagram
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
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
  )
}

// Main Page Component
export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <PassionsSection />
      <InstagramSection />
      <RecentWritingSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
