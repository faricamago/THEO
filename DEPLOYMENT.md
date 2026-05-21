# Theo - Deployment Guide

## Quick Start (Local Development)

```bash
# Install all dependencies
npm install --workspaces

# Terminal 1: Start Backend (port 3001)
cd api && npm run dev

# Terminal 2: Start Frontend (port 5173)
cd frontend && npm run dev

# Open http://localhost:5173
```

## Production Deployment on Vercel

### Option 1: Frontend on Vercel + Backend on Railway (Recommended for simplicity)

#### Step 1: Deploy Frontend to Vercel

1. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/theo.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure build settings:
     - Build Command: `cd frontend && npm run build`
     - Output Directory: `frontend/dist`
     - Root Directory: `./`
   - Deploy!

3. **After deployment, note your frontend URL** (e.g., `https://theo.vercel.app`)

#### Step 2: Deploy Backend to Railway

1. **Create a Railway account** at [railway.app](https://railway.app)

2. **Create new project**
   - Click "New Project" → "GitHub Repo"
   - Select your theo repository
   - Railway will auto-detect it's a Node.js project

3. **Configure service**
   - Set environment variable: `RAILWAY_ENVIRONMENT=production`
   - The start command should be: `cd api && npm start`

4. **Deploy and note your backend URL** (e.g., `https://your-backend.railway.app`)

5. **Add your backend URL to frontend**
   - In `frontend/src/App.tsx`, update the API baseURL in axios calls
   - Replace `/api` with your full backend URL

#### Step 3: Connect Frontend to Backend

Update `frontend/vite.config.ts` proxy configuration to point to your deployed backend:

```typescript
server: {
  proxy: {
    '/api': {
      target: 'https://your-backend.railway.app',
      changeOrigin: true,
    }
  }
}
```

Or create a `.env.production` file:
```
VITE_API_URL=https://your-backend.railway.app
```

---

### Option 2: Full Deployment on Vercel (with Serverless Functions)

This approach uses Vercel's serverless functions for the backend API.

1. **Restructure API routes** to Vercel serverless format
2. **Move routes to `/api` directory** following Vercel's API Routes convention
3. **Deploy to Vercel** - they'll automatically handle the serverless functions

[See Vercel API Routes docs for details](https://vercel.com/docs/functions/serverless-functions)

---

### Option 3: Self-Hosted Backend

**Deploy to your own VPS (DigitalOcean, AWS EC2, Linode, etc.)**

1. **Clone the repo on your server**
   ```bash
   git clone https://github.com/YOUR_USERNAME/theo.git
   cd theo
   ```

2. **Install dependencies**
   ```bash
   npm install --workspaces
   ```

3. **Build frontend**
   ```bash
   cd frontend && npm run build
   ```

4. **Start backend** (with PM2 for persistence)
   ```bash
   npm install -g pm2
   pm2 start "cd api && npm start" --name theo-api
   pm2 save
   ```

5. **Setup Nginx reverse proxy** to serve frontend and route API calls:
   ```nginx
   server {
       listen 80;
       server_name theo.yourdomain.com;

       # Frontend static files
       location / {
           root /path/to/frontend/dist;
           try_files $uri $uri/ /index.html;
       }

       # Backend API
       location /api/ {
           proxy_pass http://localhost:3001/api/;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

6. **Setup SSL** with Let's Encrypt:
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d theo.yourdomain.com
   ```

---

## Environment Variables

### Backend (`.env`)
```
PORT=3001
NODE_ENV=production
```

### Frontend (`.env.production`)
```
VITE_API_URL=https://your-backend-url.com
```

---

## Verifying Deployment

After deploying, test all features:

```bash
# Test backend health
curl https://your-backend.railway.app/api/health

# Add a test expense
curl -X POST https://your-backend.railway.app/api/expenses \
  -H "Content-Type: application/json" \
  -d '{"person":"Farica","description":"Test","amount":10,"category":"Other"}'

# Get expenses
curl https://your-backend.railway.app/api/expenses

# Generate PDF report
curl "https://your-backend.railway.app/api/reports/generate?month=5&year=2026" \
  -o report.pdf
```

---

## Troubleshooting

### Port 3001 in use
```bash
# Linux/Mac
lsof -i :3001 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Or just use a different port
PORT=3002 npm run dev
```

### CSV files not persisting
- Ensure `/api/data` directory exists and is writable
- On serverless platforms, use a persistent storage service like:
  - AWS S3 or DynamoDB
  - MongoDB Atlas
  - Supabase PostgreSQL

### Backend not responding
- Check backend logs: `tail -f /var/log/pm2/theo-api.log`
- Verify PORT environment variable
- Check firewall rules

### CORS errors
- Backend CORS is enabled for all origins by default
- For production, update `api/src/index.ts` to restrict origins:
  ```typescript
  app.use(cors({
    origin: 'https://your-frontend.vercel.app'
  }))
  ```

---

## Scaling Considerations

**For larger datasets**, consider migrating from CSV to a database:

1. **MongoDB** (Easy, free tier available)
2. **PostgreSQL** (More powerful, good with Supabase)
3. **Firebase** (Serverless, real-time)

Would require minimal changes to API routes - just replace CSV handlers with database queries.

---

## Security Checklist

- [ ] Add authentication (currently anyone can access the API)
- [ ] Add rate limiting to prevent abuse
- [ ] Use HTTPS/TLS for all connections
- [ ] Validate all user inputs
- [ ] Add CSRF protection if adding a web form
- [ ] Use environment variables for sensitive data
- [ ] Enable CORS restrictions to trusted domains only
- [ ] Regular backups of CSV data files

---

## Support

For issues or questions:
1. Check the main README.md
2. Review the troubleshooting section above
3. Check backend logs
4. Verify all environment variables are set correctly
