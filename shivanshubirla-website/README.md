# Shivanshu Birla - Personal Website

A personal journal and portfolio website built with Next.js 14, featuring a file-based MDX blog system.

## Features

- **Homepage** with hero section, about, passions, Instagram grid, recent writing, and contact
- **Blog** with category filters and MDX-powered posts
- **Framer Motion** animations throughout
- **Responsive design** with custom design system

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- MDX + gray-matter for blog CMS
- Google Fonts (Cormorant Garamond, DM Sans, DM Mono)

## Getting Started

```bash
# Install dependencies
yarn install

# Run development server
yarn dev

# Build for production
yarn build
```

## Adding a Blog Post

1. Create a new `.mdx` file in `/content/posts/`
2. Add frontmatter at the top:

```mdx
---
title: "Your Post Title"
date: "2025-06-26"
category: "Life"  # Options: Investments, Life, Travel, Fitness & Spirituality, Giving Back
excerpt: "A brief description of the post."
---

# Your Content Here

Write your post content in Markdown format.
```

3. Redeploy the site (or run `yarn build` locally)

## Connecting Instagram via Elfsight

1. Go to [Elfsight](https://elfsight.com/) and create an Instagram Feed widget
2. Get your widget embed code
3. In `app/layout.tsx`, uncomment the Elfsight script tag and add your widget ID
4. Replace the placeholder grid in the Instagram section with your Elfsight widget

## Deploying to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com) and import your repository
3. Vercel will auto-detect Next.js and configure the build
4. Click "Deploy"

## Pointing Your Domain

1. In Vercel dashboard, go to your project → Settings → Domains
2. Add `shivanshubirla.com`
3. Update your domain's DNS settings:
   - Add an A record pointing to Vercel's IP: `76.76.21.21`
   - Or add a CNAME record pointing to `cname.vercel-dns.com`
4. Wait for DNS propagation (usually 24-48 hours)

## Design System

| Element | Value |
|---------|-------|
| Background | #FAF8F4 (warm cream) |
| Text | #1A1A1A |
| Gold accent | #C9A96E |
| Gold dark | #A07840 |
| Dark sections | #0D0D0D |
| Borders | rgba(0,0,0,0.07) at 0.5px |
| Display font | Cormorant Garamond |
| Body font | DM Sans (weight 300) |
| Label font | DM Mono |
| Border radius | 2px max |

## Project Structure

```
/app
├── app/
│   ├── page.tsx          # Homepage
│   ├── layout.tsx        # Root layout with fonts
│   ├── globals.css       # Global styles
│   └── blog/
│       ├── page.tsx      # Blog listing
│       └── [slug]/
│           └── page.tsx  # Individual blog post
├── content/
│   └── posts/            # MDX blog posts
├── lib/
│   └── mdx.ts            # MDX utilities
├── public/
│   └── hero.jpg          # Hero background image
└── README.md
```

## Contact

- Email: shivanshu@makiacapital.com
- Instagram: [@birlashivanshu](https://instagram.com/birlashivanshu)
- LinkedIn: [birlashivanshu](https://linkedin.com/in/birlashivanshu)
