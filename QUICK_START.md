# Quick Start Guide

Get your Book Landing Frontend up and running in 5 minutes!

## Prerequisites

- ✅ Node.js 18+ installed
- ✅ word2wallet-backend running on http://localhost:5000
- ✅ book-reader-frontend running on http://localhost:3002 (optional, for reading books)
- ✅ At least one landing page created in the backend

## Installation (2 minutes)

### Option 1: Automatic Setup (Recommended)

```bash
cd book-landing-frontend
npm install
npm run dev
```

### Option 2: Manual Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy environment file
cp .env.example .env.local

# 3. Edit environment variables
# Set NEXT_PUBLIC_API_URL=http://localhost:5000/api
# Set NEXT_PUBLIC_READER_URL=http://localhost:3002 (for book reader)

# 4. Start development server
npm run dev
```

## Access Your Landing Pages (1 minute)

1. **Create a Landing Page** in word2wallet-backend dashboard

   - Go to http://localhost:3001 (or your frontend dashboard)
   - Create a new landing page
   - Note the ID (e.g., "507f1f77bcf86cd799439011")

2. **View the Landing Page**
   - Open: http://localhost:3000/507f1f77bcf86cd799439011
   - Replace the ID with your actual landing page ID

## Example Landing Pages

Based on the images you provided, here are examples:

### Example 1: Book Promo Service Page

```
Slug: book-promo-ai
URL: http://localhost:3000/book-promo-ai
Type: Email Signup
Theme: Blue Theme
```

### Example 2: Mystery Book Page

```
Slug: forevermore-mystery
URL: http://localhost:3000/forevermore-mystery
Type: Simple Download
Theme: WordToWallet Black & Gray
```

### Example 3: Horror Story Page

```
Slug: dr-stanfords-fear
URL: http://localhost:3000/dr-stanfords-fear
Type: Restricted Access
Theme: WordToWallet Black & Gray
```

## Testing (1 minute)

Test your landing page:

1. **Visit the URL**: http://localhost:3000/[your-slug]
2. **Check the Layout**:
   - Book cover on the left ✓
   - Content on the right ✓
   - Responsive design ✓
3. **Test Form Submission**:
   - Enter email (and name if required)
   - Click the CTA button
   - Verify success message
4. **Check Backend**:
   - Email capture should be saved
   - Analytics should increment

## Common Issues

### Landing Page Not Found

**Problem**: "Page not found" error

**Solutions**:

- Verify backend is running: `curl http://localhost:5000/api/health`
- Check ID is correct (must be a valid MongoDB ObjectId)
- Ensure landing page is active (`isActive: true`)
- Check browser console for errors

### Images Not Loading

**Problem**: Book cover doesn't display

**Solutions**:

- Verify `coverImageUrl` in database
- Check image URL is accessible
- Look at browser network tab for errors

### API Connection Error

**Problem**: Cannot connect to backend

**Solutions**:

- Check `.env.local` has correct `NEXT_PUBLIC_API_URL`
- Verify backend is running on port 5000
- Check CORS settings in backend allow localhost:3000

## File Structure

```
book-landing-frontend/
├── src/
│   ├── app/
│   │   ├── [id]/                # 👈 Dynamic landing pages (by ID)
│   │   │   └── page.tsx
│   │   └── page.tsx             # Home page
│   ├── components/              # 👈 UI components
│   │   ├── LandingPageView.tsx  # Main layout
│   │   ├── BookCover.tsx        # 3D book cover
│   │   └── EmailForm.tsx        # Email capture
│   ├── lib/
│   │   ├── api.ts              # 👈 Backend API calls
│   │   └── themes.ts           # Color themes
│   └── types/                   # TypeScript types
└── .env.local                   # 👈 Configuration
```

## Next Steps

### 1. Customize Themes

Edit `src/lib/themes.ts` to add custom color schemes.

### 2. Modify Layout

Edit `src/components/LandingPageView.tsx` to change:

- Grid layout
- Typography
- Spacing
- Additional sections

### 3. Add Features

Consider adding:

- Social proof sections
- Testimonials
- Book preview
- Author bio
- FAQ section

### 4. Deploy to Production

See `DEPLOYMENT.md` for:

- Vercel deployment
- Custom domain setup
- SSL configuration
- Performance optimization

## Support

- 📖 Full documentation: `README.md`
- 🛠️ Setup guide: `SETUP.md`
- 🚀 Deployment guide: `DEPLOYMENT.md`

## Tips for Best Results

### 1. High-Quality Book Covers

- Use 1000x1500px or higher resolution
- PNG or JPG format
- Clear, professional design

### 2. Compelling Copy

- Clear value proposition
- Strong call-to-action
- Benefit-focused description

### 3. Theme Selection

- Match theme to book genre
- Dark themes for thrillers/horror
- Light themes for romance/self-help
- Blue for business/professional

### 4. Test on Mobile

- 50%+ of traffic is mobile
- Test form submission
- Check image loading
- Verify button sizes

## Development Workflow

```bash
# 1. Start backend
cd word2wallet-backend
npm run dev

# 2. Start frontend (in another terminal)
cd book-landing-frontend
npm run dev

# 3. Make changes
# Edit files in src/
# Changes auto-reload

# 4. Test
# Visit http://localhost:3000/[slug]

# 5. Build for production
npm run build
npm start
```

## Ready to Go! 🎉

Your Book Landing Frontend is now ready to display beautiful, conversion-optimized landing pages!

Create your first landing page and watch it come to life at:
**http://localhost:3000/[your-landing-page-id]**
