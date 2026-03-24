# Spotlight Template Migration Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Replace the custom dark-mode single-page portfolio with the Tailwind Plus Spotlight template, populated with Rai's content, plus a Discord/Slack webhook contact form and availability indicator.

**Architecture:** Nuke existing src/, install Spotlight's dependencies, copy template components verbatim, then swap placeholder content with Rai's real data across 6 pages (Home, About, Projects, Reviews, Uses, Articles). Add a lightweight contact form (replaces Newsletter) and availability badge in the header. Static export to nginx VPS preserved.

**Tech Stack:** Next.js 16, Tailwind CSS v4, headlessui/react, next-themes, clsx, tailwindcss/typography, MDX

---

### Task 1: Clean Slate and Install New Dependencies

**Files:**
- Delete: `src/` (entire directory)
- Delete: `tailwind.config.js`
- Modify: `package.json`
- Create: `.env`

Steps:
- [ ] Remove old src/ directory and tailwind.config.js
- [ ] Replace package.json with Spotlight dependencies (next 16.1.6, headlessui, next-themes, clsx, mdx, tailwindcss v4, typography, cheerio, feed, fast-glob, sharp)
- [ ] Create `.env` with `NEXT_PUBLIC_SITE_URL=https://raiansar.com`
- [ ] `rm -rf node_modules package-lock.json && npm install`
- [ ] Commit: `chore: clean slate, install Spotlight deps`

---

### Task 2: Copy Template Foundation (Config, Styles, Components)

**Files:**
- Delete: `next.config.ts`, `postcss.config.mjs`
- Create from template: `next.config.mjs`, `typography.ts`, `mdx-components.tsx`, `postcss.config.js`, `.eslintrc.json`, `prettier.config.js`
- Overwrite: `tsconfig.json`
- Create from template: `src/styles/tailwind.css`, `src/styles/prism.css`
- Create from template (verbatim): `src/components/Card.tsx`, `src/components/Button.tsx`, `src/components/Container.tsx`, `src/components/Section.tsx`, `src/components/SimpleLayout.tsx`, `src/components/Prose.tsx`, `src/components/SocialIcons.tsx`, `src/components/Layout.tsx`, `src/components/ArticleLayout.tsx`
- Create from template: `src/lib/articles.ts`, `src/lib/formatDate.ts`

Steps:
- [ ] Delete old config files (next.config.ts, postcss.config.mjs)
- [ ] Copy all template configs verbatim, then modify `next.config.mjs` to add: `output: 'export'`, `images: { unoptimized: true }`, `trailingSlash: true`
- [ ] Copy `src/styles/` verbatim (tailwind.css + prism.css)
- [ ] Copy all 9 components verbatim from template
- [ ] Copy `src/lib/` verbatim (articles.ts + formatDate.ts)
- [ ] Commit: `feat: Spotlight template foundation`

---

### Task 3: Header with Availability Indicator

**Files:**
- Create: `src/components/Header.tsx`

Steps:
- [ ] Copy template Header.tsx verbatim
- [ ] Change nav items to: About, Projects, Reviews, Uses, Articles (change `/speaking` to `/reviews`)
- [ ] Add AvailabilityBadge component that fetches `/api/status.json` every 30s, shows green/yellow/red dot with status text, styled to match template's pill buttons (bg-white/90, shadow-lg, ring-1, backdrop-blur)
- [ ] Place badge next to ThemeToggle in the header right section
- [ ] Commit: `feat: header with availability indicator`

---

### Task 4: Footer with Rai's Links

**Files:**
- Create: `src/components/Footer.tsx`

Steps:
- [ ] Copy template Footer.tsx, change nav links to: About, Projects, Reviews, Uses
- [ ] Change copyright to "Rai Ansar"
- [ ] Commit: `feat: footer with Rai's links`

---

### Task 5: Providers and Layout with SEO

**Files:**
- Create: `src/app/providers.tsx` (verbatim from template)
- Create: `src/app/layout.tsx`

Steps:
- [ ] Copy providers.tsx verbatim
- [ ] Create layout.tsx based on template structure, adding: Rai's metadata (title template "%s - Rai Ansar", description, keywords, OG, Twitter, canonical), GA4 (G-CS3DHX5C7C) via next/script afterInteractive, Ahrefs analytics script, Schema.org Person JSON-LD (name, jobTitle, sameAs, knowsAbout, address Islamabad PK)
- [ ] Commit: `feat: layout with SEO, GA4, Ahrefs, schema.org`

---

### Task 6: Home Page (Hero + Contact Form + Resume)

**Files:**
- Create: `src/app/page.tsx`
- Create: `src/images/avatar.jpg` (from hero-rai.jpg)
- Create: `src/images/portrait.jpg` (from hero-rai.jpg)
- Create: `src/images/photos/image-{1..5}.jpg` (from existing photos)

Steps:
- [ ] Copy avatar/portrait images from public/images/hero-rai.jpg to src/images/
- [ ] Copy existing photo variants to src/images/photos/ as placeholders
- [ ] Create home page based on template structure with:
  - Hero title: "Full-stack developer, DevOps expert, and problem solver."
  - Hero bio: "I'm Rai, a full-stack developer and DevOps expert based in Islamabad. I build fast websites, fix broken servers, and turn technical debt into clean, scalable systems. 6+ years of shipping code that works."
  - Social links: GitHub, X, LinkedIn (+ Upwork icon added to SocialIcons.tsx)
  - Photos strip using placeholder images
  - Articles section (will be empty, shows nothing gracefully)
- [ ] Replace Newsletter component with ContactForm: name input, email input, message textarea, submit button. On submit POST JSON to `NEXT_PUBLIC_WEBHOOK_URL` env var with Discord webhook format (`{ content: "**New Contact**\nName: ...\nEmail: ...\nMessage: ..." }`). Show success/error state. Use same input styling as template newsletter.
- [ ] Resume section with work history: Freelance (Full-Stack Dev, 2020-Present), Upwork (Top Rated, 2019-Present), Fiverr (Level 2 Seller, 2018-2022). Use simple colored-circle SVG logos.
- [ ] Download CV button links to a future resume PDF or `#`
- [ ] Commit: `feat: home page with hero, contact form, resume`

---

### Task 7: About Page

**Files:**
- Create: `src/app/about/page.tsx`

Steps:
- [ ] Create about page using template About structure with:
  - Title: "I'm Rai Ansar. I live in Islamabad, where I build the web."
  - Bio (4 paragraphs): early start with WordPress, progression to full-stack/DevOps, core stack description, current freelance work
  - Portrait: src/images/portrait.jpg
  - Social links with labels: Follow on X, Follow on GitHub, Follow on LinkedIn, Hire on Upwork, Email hello@raiansar.com
  - Add UpworkIcon to SocialIcons.tsx if not done in Task 6
  - Metadata: title "About", description from first paragraph
- [ ] Commit: `feat: about page with bio and social links`

---

### Task 8: Projects Page (Services)

**Files:**
- Create: `src/app/projects/page.tsx`

Steps:
- [ ] Create projects page using template Projects structure with 5 service cards:
  1. Frontend Development - "High-performance landing pages and web apps..." / label: "React / Next.js / TypeScript"
  2. WordPress Development - "Custom themes, plugins, migrations..." / label: "Themes / Plugins / WooCommerce"
  3. E-Commerce Solutions - "Checkout flows, catalog logic..." / label: "Stripe / WooCommerce / SEO"
  4. DevOps and Infrastructure - "Secure deployments, automation..." / label: "Docker / AWS / CI/CD"
  5. Backend Development - "Secure APIs and scalable services..." / label: "Node.js / PostgreSQL / Redis"
  - Use inline SVG icon components for logos (simple themed icons, no external files)
  - Page title: "End-to-end expertise across the full stack."
  - Page intro: "I've worked on hundreds of projects over the years across frontend, backend, WordPress, e-commerce, and DevOps. Here's what I can help you build."
  - Links: set href="#" and label to tech pills
- [ ] Commit: `feat: projects page with 5 service offerings`

---

### Task 9: Reviews Page (Testimonials)

**Files:**
- Create: `src/app/reviews/page.tsx`

Steps:
- [ ] Create reviews page using template Speaking page structure (SimpleLayout + Section + Card):
  - Page title: "Real feedback from clients who've worked with me."
  - Page intro: "I've been fortunate to work with clients worldwide across Upwork and Fiverr. Here's what they had to say."
  - Section "Upwork" with 11 testimonials as Card items (Card.Title = client name, Card.Description = quote)
  - Section "Fiverr" with 16 testimonials as Card items
  - All 27 testimonials from current data/testimonials.ts inline in the page
- [ ] Commit: `feat: reviews page with 27 testimonials`

---

### Task 10: Uses Page (Tech Stack)

**Files:**
- Create: `src/app/uses/page.tsx`

Steps:
- [ ] Create uses page using template Uses structure (SimpleLayout + ToolsSection + Tool):
  - Page title: "Software I use, tools I rely on, and my go-to stack."
  - Page intro: "I get asked about my stack a lot. Here's what I use day-to-day to build, deploy, and maintain software."
  - Section "Languages and Frameworks": React/Next.js, TypeScript, Node.js/Express, WordPress/PHP (each with description)
  - Section "Infrastructure and DevOps": Docker, AWS/Cloud, CI/CD (GitHub Actions), nginx
  - Section "Databases and Caching": PostgreSQL, Redis
  - Section "Tools": VS Code, Figma, Cloudflare
- [ ] Commit: `feat: uses page with tech stack and tools`

---

### Task 11: Articles, Not Found, Thank You

**Files:**
- Create: `src/app/articles/page.tsx`
- Create: `src/app/not-found.tsx`
- Create: `src/app/thank-you/page.tsx`

Steps:
- [ ] Copy articles/page.tsx from template verbatim (will show empty gracefully)
- [ ] Copy not-found.tsx from template verbatim
- [ ] Create thank-you page: title "Message sent", intro "I'll review your message and get back to you within 24 hours."
- [ ] Remove `src/app/feed.xml/` route (incompatible with static export, no articles yet)
- [ ] Commit: `feat: articles, not-found, thank-you pages`

---

### Task 12: Public Assets and SEO

**Files:**
- Modify: `public/sitemap.xml`
- Modify: `public/llms.txt`
- Keep: `public/robots.txt`, `public/api/status.json`, `public/b9e8ec*.txt`, `public/favicon.svg`, `public/images/og-image.png`, `public/images/hero-rai.jpg`

Steps:
- [ ] Update sitemap.xml with all 6 pages: /, /about/, /projects/, /reviews/, /uses/, /articles/
- [ ] Update llms.txt to reference new multi-page structure
- [ ] Clean up unused public assets: `rm -rf public/images/jpg public/images/webp public/images/svg public/images/bg.webp public/images/me-*.webp`
- [ ] Commit: `feat: update SEO files for multi-page site`

---

### Task 13: Build, Test, Fix

Steps:
- [ ] Run `npm run build` and fix any errors
- [ ] Common fixes: missing image imports, MDX config with static export, feed.xml route removal, TypeScript strict mode
- [ ] Test with `npx serve out`: verify all pages render, nav works, theme toggle works, images display, mobile layout works, 404 works
- [ ] Commit any fixes: `fix: build fixes`

---

### Task 14: Deploy

Steps:
- [ ] `npm run build && rsync -avz --delete ./out/ root@76.13.98.111:/var/www/raiansar/`
- [ ] Purge Cloudflare cache
- [ ] Verify https://raiansar.com and all subpages
- [ ] Submit new URLs to IndexNow
