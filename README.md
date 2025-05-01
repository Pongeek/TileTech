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