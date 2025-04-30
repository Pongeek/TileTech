# TileTech Website

A modern, mobile-friendly business website in Hebrew for TileTech, a tile installation service in Israel. The website is built with Next.js and features RTL (Right-to-Left) support for Hebrew content.

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