# Setup Guide for Book Landing Frontend

## Prerequisites

Make sure you have the following installed:

- Node.js 18 or higher
- npm or yarn
- word2wallet-backend running on http://localhost:5000
- book-reader-frontend running on http://localhost:3002 (optional, for reading books in browser)

## Step-by-Step Setup

### 1. Install Dependencies

```bash
cd book-landing-frontend
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_READER_URL=http://localhost:3002
NEXT_PUBLIC_APP_NAME=Book Landing Pages
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Note:** `NEXT_PUBLIC_READER_URL` is the URL of your book-reader-frontend application. When users click "WordToWallet" or "Read in Browser", they will be redirected to this reader application.

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at http://localhost:3000

### 4. Test with a Landing Page

1. Make sure your word2wallet-backend is running
2. Create a landing page in the backend (use the word2wallet-frontend dashboard)
3. Note the slug of your landing page
4. Access it at: `http://localhost:3000/[your-slug]`

Example:

- If your slug is `free-mystery-book`
- Access at: `http://localhost:3000/free-mystery-book`

## Project Structure

```
book-landing-frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [slug]/            # Dynamic landing page route
│   │   │   └── page.tsx       # Landing page handler
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── BookCover.tsx      # Book cover with 3D effect
│   │   ├── EmailForm.tsx      # Email capture form
│   │   ├── ErrorPage.tsx      # Error display
│   │   ├── LandingPageView.tsx # Main landing page layout
│   │   ├── LoadingPage.tsx    # Loading state
│   │   └── SuccessMessage.tsx # Success confirmation
│   ├── lib/                   # Utilities
│   │   ├── api.ts            # API client
│   │   ├── themes.ts         # Theme configurations
│   │   └── utils.ts          # Helper functions
│   └── types/                # TypeScript types
│       └── index.ts          # Type definitions
├── public/                   # Static assets
├── .env.example             # Environment template
├── next.config.js           # Next.js config
├── tailwind.config.ts       # Tailwind CSS config
└── package.json             # Dependencies
```

## How Landing Pages Work

### 1. URL Structure

Landing pages use the ID as the URL:

```
http://localhost:3000/[id]
```

### 2. Data Flow

1. User visits `/[id]`
2. Frontend calls `GET /api/landing-pages/public/[id]`
3. Backend returns landing page data including:
   - Book information (title, author, cover, description)
   - Landing page settings (theme, layout, text)
   - Page type (simple_download, email_signup, restricted, universal_link)
4. Frontend renders the page based on settings

### 3. Conversion Flow

When user submits the form:

1. Frontend calls `POST /api/landing-pages/public/[id]/conversion`
2. Sends email, firstName, lastName (if required)
3. Backend:
   - Saves email capture
   - Updates analytics
   - Returns download URL or redirect URL
4. Frontend shows success message and triggers download

## Customization

### Adding New Themes

Edit `src/lib/themes.ts`:

```typescript
export const themes: Record<string, Theme> = {
  "My Custom Theme": {
    bg: "bg-gradient-to-br from-purple-900 to-pink-900",
    text: "text-white",
    accent: "text-purple-100",
    buttonBg: "bg-pink-600",
    buttonText: "text-white",
    buttonHover: "hover:bg-pink-700",
    border: "border-purple-600",
    inputBg: "bg-purple-800/50",
    inputBorder: "border-purple-500",
    inputFocus: "focus:ring-pink-500",
  },
};
```

### Customizing Layout

Edit `src/components/LandingPageView.tsx` to modify:

- Grid layout
- Spacing
- Typography
- Additional sections

### Styling

The project uses Tailwind CSS. Edit:

- `tailwind.config.ts` - Theme configuration
- `src/app/globals.css` - Global styles and custom classes

## Building for Production

### Build

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Deploy

The app can be deployed to:

- Vercel (recommended for Next.js)
- Netlify
- AWS
- Any Node.js hosting

## Environment Variables for Production

```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
NEXT_PUBLIC_READER_URL=https://your-reader-domain.com
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## Troubleshooting

### Landing Page Not Found

- Check if backend is running
- Verify the slug exists in the database
- Ensure the landing page is active (`isActive: true`)
- Check CORS settings in backend

### Images Not Loading

- Verify `coverImageUrl` is accessible
- Check Next.js image domains in `next.config.js`
- Ensure images are served with proper CORS headers

### API Connection Issues

- Verify `NEXT_PUBLIC_API_URL` in `.env.local`
- Check backend is running and accessible
- Look at browser console for errors
- Check network tab in DevTools

## Testing

### Test a Landing Page

1. Create a test landing page in backend
2. Get the ID (e.g., "507f1f77bcf86cd799439011")
3. Visit: `http://localhost:3000/507f1f77bcf86cd799439011`
4. Test the form submission
5. Verify analytics are tracked in backend

### Test Different Page Types

- **Simple Download**: No email required
- **Email Signup**: Requires email, optional name fields
- **Restricted**: Email required with access control
- **Universal Link**: Multiple retailer links

## Support

For issues or questions:

1. Check the backend logs
2. Check browser console for errors
3. Verify API endpoints are accessible
4. Review the README.md for additional info
