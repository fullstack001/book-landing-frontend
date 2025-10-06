# Deployment Guide

## Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications.

### 1. Install Vercel CLI

```bash
npm i -g vercel
```

### 2. Login to Vercel

```bash
vercel login
```

### 3. Deploy

```bash
cd book-landing-frontend
vercel
```

### 4. Set Environment Variables

In Vercel dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add:
   - `NEXT_PUBLIC_API_URL` = Your backend API URL
   - `NEXT_PUBLIC_APP_URL` = Your frontend URL

### 5. Redeploy

```bash
vercel --prod
```

## Deploy to Netlify

### 1. Build Settings

- Build command: `npm run build`
- Publish directory: `.next`
- Node version: 18

### 2. Environment Variables

Add in Netlify dashboard:

- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_APP_URL`

### 3. Deploy

```bash
npm run build
netlify deploy --prod
```

## Deploy to AWS (EC2)

### 1. Setup EC2 Instance

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2
```

### 2. Clone and Setup

```bash
git clone <your-repo>
cd book-landing-frontend
npm install
npm run build
```

### 3. Create Ecosystem File

Create `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [
    {
      name: "book-landing-frontend",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        NEXT_PUBLIC_API_URL: "https://your-api.com/api",
        NEXT_PUBLIC_APP_URL: "https://your-domain.com",
      },
    },
  ],
};
```

### 4. Start with PM2

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 5. Setup Nginx

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Deploy with Docker

### 1. Create Dockerfile

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### 2. Create docker-compose.yml

```yaml
version: "3.8"

services:
  frontend:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:5000/api
      - NEXT_PUBLIC_APP_URL=http://localhost:3000
    depends_on:
      - backend
    restart: unless-stopped

  backend:
    # Your existing backend service
    ports:
      - "5000:5000"
    restart: unless-stopped
```

### 3. Build and Run

```bash
docker-compose up -d
```

## Domain Configuration

### Custom Domain Setup

1. **Purchase Domain** (from GoDaddy, Namecheap, etc.)

2. **Configure DNS Records**:

   ```
   Type: A
   Name: @
   Value: <your-server-ip>

   Type: CNAME
   Name: www
   Value: <your-domain.com>
   ```

3. **SSL Certificate** (Let's Encrypt):
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com -d www.your-domain.com
   ```

## Performance Optimization

### 1. Enable CDN

Use a CDN for static assets:

- Cloudflare
- AWS CloudFront
- Vercel Edge Network

### 2. Image Optimization

Next.js automatically optimizes images. Configure in `next.config.js`:

```javascript
module.exports = {
  images: {
    domains: ["your-image-domain.com"],
    formats: ["image/avif", "image/webp"],
  },
};
```

### 3. Caching Strategy

Configure cache headers in `next.config.js`:

```javascript
async headers() {
  return [
    {
      source: '/:all*(svg|jpg|png|webp|avif)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ]
}
```

## Monitoring

### 1. Setup Monitoring

Use services like:

- Vercel Analytics
- Google Analytics
- Sentry for error tracking

### 2. Add to layout.tsx

```typescript
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Script src="https://www.googletagmanager.com/gtag/js?id=GA_ID" />
      </body>
    </html>
  );
}
```

## Security

### 1. Environment Variables

Never commit `.env.local` to git. Use:

- Vercel/Netlify environment variables UI
- AWS Secrets Manager
- Docker secrets

### 2. CORS Configuration

Ensure backend CORS allows your frontend domain:

```javascript
// Backend
app.use(
  cors({
    origin: ["https://your-domain.com"],
    credentials: true,
  })
);
```

### 3. Rate Limiting

Implement rate limiting on the backend API.

## Backup Strategy

### 1. Automated Backups

- Use Git for code versioning
- Regular database backups
- S3 for file uploads

### 2. Disaster Recovery

Document your:

- Deployment process
- Environment variables
- Domain configuration
- Database schema

## Troubleshooting Production Issues

### 1. Check Logs

```bash
# Vercel
vercel logs

# PM2
pm2 logs

# Docker
docker logs <container-id>
```

### 2. Common Issues

**API Connection Failed**

- Verify NEXT_PUBLIC_API_URL is correct
- Check CORS settings
- Ensure backend is running

**Images Not Loading**

- Add domain to next.config.js
- Check image URLs are absolute
- Verify CORS for images

**Slow Performance**

- Enable CDN
- Optimize images
- Check database queries
- Monitor server resources

## Scaling

### Horizontal Scaling

1. **Load Balancer**: Use Nginx or AWS ALB
2. **Multiple Instances**: Run multiple frontend instances
3. **CDN**: Distribute static assets globally

### Vertical Scaling

1. **Upgrade Server**: More CPU/RAM
2. **Optimize Code**: Code splitting, lazy loading
3. **Database**: Optimize queries, add indexes

## Maintenance

### Regular Updates

```bash
# Update dependencies
npm update

# Check for security issues
npm audit

# Fix vulnerabilities
npm audit fix
```

### Health Checks

Create `/api/health` endpoint to monitor app status.
