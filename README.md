# TileTech Website

Modern website for TileTech - Professional Tile Installation Services in Israel.

## Deployment Guide

### Prerequisites
- Node.js 16.x or higher
- Vercel account

### Steps to Deploy

1. Clone the repository
```bash
git clone https://github.com/your-username/tiletechweb.git
cd tiletechweb
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables in Vercel
   - NEXT_PUBLIC_SITE_URL
   - NEXT_PUBLIC_API_URL
   - NEXT_PUBLIC_CONTACT_EMAIL
   - NEXT_PUBLIC_CONTACT_PHONE
   - NEXT_PUBLIC_CONTACT_WHATSAPP

4. Deploy to Vercel using the Vercel CLI
```bash
npm install -g vercel
vercel
```

### Environment Variables

Create a `.env.local` file for local development:
```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_CONTACT_EMAIL=contact@tiletech.co.il
NEXT_PUBLIC_CONTACT_PHONE=+972-50-123-4567
NEXT_PUBLIC_CONTACT_WHATSAPP=+972501234567
```

### Performance Optimizations

The website has been optimized for performance:
- Next.js Image component with WebP/AVIF support
- Lazy loading for off-screen content
- Font optimization with font-display: swap and preloading
- Code splitting for improved initial load time
- Caching headers for static assets

### Caching & Environment Configuration

This project uses HTTP `Cache-Control` headers configured in `next.config.js`:

| Path pattern | Cache header |
|--------------|--------------|
| `/fonts/:path*` | `public, max-age=31536000, immutable` |
| `/_next/static/:path*` | `public, max-age=31536000, immutable` |
| `/:path*.js` / `/:path*.css` | `public, max-age=31536000, immutable` |
| `/images/:path*` & `/_next/image/:path*` | `public, max-age=86400, stale-while-revalidate=31536000` |

Add or adjust rules in `next.config.js → headers()` as needed.

Environment variables are stored per-environment:

1. `.env.example` – template committed to git (non-secret).
2. `.env.local` – developer overrides.
3. `.env.production` – **not** committed; values replicated in Vercel UI.

Keep server-only variables **without** `NEXT_PUBLIC_` prefix. Use `NEXT_PUBLIC_` for variables that must reach the browser.

### Structured Data

The website implements JSON-LD structured data for:
- Local Business information
- Services offered
- Reviews and testimonials

### SEO Optimizations

- Hebrew meta tags with expanded descriptions and keywords
- Canonical URL tags
- OpenGraph and Twitter Card meta tags
- Descriptive alt text for images
- Comprehensive sitemap.xml and robots.txt

## Features

- Single-page design with smooth navigation
- Fully responsive and mobile-friendly layout
- RTL support for Hebrew content
- SEO optimization for local search
- Modern UI with warm, earthy color palette
- Contact form with validation

## Tech Stack

- Next.js (React framework)
- TypeScript
- Tailwind CSS with RTL plugin
- ESLint for code quality

## Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/your-username/tiletech-web.git
cd tiletech-web
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the development server**

```bash
npm run dev
```

4. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## Project Structure

- `src/app`: App Router pages and layout
- `src/components`: React components
  - `layout`: Layout components like Header and Footer
  - `sections`: Homepage section components
  - `ui`: Reusable UI components
- `src/styles`: Global styles and Tailwind configuration
- `public`: Static assets like images and fonts

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=TileTech
NEXT_PUBLIC_CONTACT_EMAIL=contact@example.com
NEXT_PUBLIC_CONTACT_PHONE=123-456-7890
```

## Production Build

```bash
npm run build
npm start
```

## License

This project is licensed under the MIT License 