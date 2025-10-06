# Book Landing Page Frontend

A standalone Next.js frontend application for displaying beautiful book landing pages. This project connects to the word2wallet-backend API.

## Features

- 🎨 **Beautiful Landing Pages** - Book cover on left, promotional content on right
- 📱 **Responsive Design** - Works perfectly on all devices
- 🎯 **Multiple Page Types** - Simple download, email signup, restricted access, universal links
- 📊 **Analytics Tracking** - Automatic view and conversion tracking
- 🎨 **Theme Support** - Multiple built-in themes
- ⚡ **Fast Performance** - Built with Next.js 14 and React 18

## Prerequisites

- Node.js 18+
- npm or yarn
- word2wallet-backend running (default: http://localhost:5000)
- book-reader-frontend running (default: http://localhost:3002) - optional, for reading books in browser

## Quick Start

1. **Install dependencies:**

```bash
npm install
```

2. **Configure environment variables:**

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_READER_URL=http://localhost:3002
```

3. **Run development server:**

```bash
npm run dev
```

4. **Open browser:**

```
http://localhost:3000
```

## Project Structure

```
book-landing-frontend/
├── src/
│   ├── app/
│   │   ├── [slug]/          # Dynamic landing page routes
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   ├── components/          # React components
│   ├── lib/                 # Utilities and API client
│   └── types/               # TypeScript types
├── public/                  # Static assets
└── tailwind.config.ts       # Tailwind configuration
```

## Landing Page URL Structure

Landing pages are accessible at:

```
http://localhost:3000/[id]
```

Example:

```
http://localhost:3000/507f1f77bcf86cd799439011
```

## Available Themes

1. **WordToWallet Black & Gray** (Default) - Dark theme with blue accents
2. **Blue Theme** - Professional blue gradient
3. **Light Theme** - Clean white background
4. **Green Theme** - Nature-inspired green tones

## Customization

### Colors

Edit `tailwind.config.ts` to customize the color palette.

### Themes

Themes are defined in `src/lib/themes.ts`. You can add custom themes by extending the theme configuration.

### Layout

The main landing page layout is in `src/app/[slug]/page.tsx`.

## Building for Production

```bash
npm run build
npm start
```

## Environment Variables

| Variable                 | Description              | Default                   |
| ------------------------ | ------------------------ | ------------------------- |
| `NEXT_PUBLIC_API_URL`    | Backend API URL          | http://localhost:5000/api |
| `NEXT_PUBLIC_READER_URL` | Book reader frontend URL | http://localhost:3002     |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Tech Stack

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Lucide React** - Icons

## API Integration

This frontend connects to the word2wallet-backend API endpoints:

- `GET /api/landing-pages/public/:slug` - Fetch landing page data
- `POST /api/landing-pages/public/:slug/conversion` - Handle conversions

## License

MIT
