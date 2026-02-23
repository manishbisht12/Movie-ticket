# VERCEL PRODUCTION FIX - CRITICAL STEPS

## The Problem
Your `.env` file has `NEXT_PUBLIC_API_URL=http://localhost:5000` which works locally but breaks in production because:
- Vercel is a public HTTPS server
- It can't access your local `localhost:5000` 
- Images fail to load with mixed content errors
- Environment variables must be set in Vercel's dashboard, not just in files

## STEP 1: Update Your `.env` File (For Local Development)
```dotenv
# Keep this for local development only
NEXT_PUBLIC_API_URL=http://localhost:5000
```
✅ This is correct for local testing

## STEP 2: Set Production Environment Variable in Vercel Dashboard
**This is the MOST IMPORTANT step!**

### Instructions:
1. Go to **https://vercel.com/dashboard**
2. Select your project **movie-ticket-topaz**
3. Click **Settings** (top menu)
4. Click **Environment Variables** (left sidebar)
5. Click **Add New** button
6. Fill in:
   - **Name:** `NEXT_PUBLIC_API_URL`
   - **Value:** `https://movie-ticket-backend-f0ss.onrender.com`
   - **Environments:** Select "Production" (or all if you prefer)
7. Click **Save**

### Expected Result:
```
NEXT_PUBLIC_API_URL = https://movie-ticket-backend-f0ss.onrender.com
```

## STEP 3: Redeploy to Apply Changes
After setting the environment variable:

### Option A: Automatic (Recommended)
1. Push code to GitHub: `git push origin manish`
2. Vercel will auto-detect and redeploy
3. Wait 2-3 minutes for deployment

### Option B: Manual Redeploy
1. In Vercel dashboard, click **Deployments**
2. Click the 3-dot menu on the latest deployment
3. Click **Redeploy**

## STEP 4: Verify the Fix
After redeployment:
1. Open your live site: https://movie-ticket-topaz.vercel.app
2. Navigate to a movie detail page
3. **Check browser console (F12 → Console)** 
4. Look for these errors:
   - ❌ "Mixed Content" error = STILL BROKEN
   - ❌ "localhost:5000" mentioned = STILL BROKEN
   - ✅ No image errors = FIXED!

## RAZORPAY ERROR FIX

The "otp-credentials" error from `checkout.js` might be caused by:

### Fix: Ensure Razorpay Script Loads After DOM is Ready
Update `app/seats/page.jsx`:

```javascript
// 1. Razorpay Script Load & Initial Data Fetch
useEffect(() => {
  // Load Razorpay script
  if (!window.Razorpay) {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      // Script loaded successfully
      console.log("Razorpay script loaded");
    };
    script.onerror = () => {
      console.error("Failed to load Razorpay script");
    };
    document.body.appendChild(script);
  }
  // ... rest of your code
}, []);
```

This ensures the Razorpay script is properly loaded before making payment requests.

## Troubleshooting Checklist

### Images Still Not Loading?
- [ ] Verified environment variable is set in Vercel dashboard
- [ ] Waited 3+ minutes after setting variable
- [ ] Redeployed the application
- [ ] Pressed Ctrl+Shift+R (hard refresh) in browser
- [ ] Checked the actual URL in browser DevTools (Network tab)

### Mixed Content Warning Still Appears?
- [ ] Make sure backend URL is HTTPS (not HTTP)
- [ ] Check your Render.com backend is running
- [ ] Check CORS settings allow your Vercel domain

### Backend Connection Issues?
Your backend on Render.com must have CORS configured:

```javascript
const cors = require('cors');

app.use(cors({
  origin: ['https://movie-ticket-topaz.vercel.app', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

## Quick Verification Commands

After changes, test with curl:
```bash
# Test if images load (replace with real image path)
curl -I https://movie-ticket-backend-f0ss.onrender.com/uploads/1771841066468-peoplewhomeetonvaccation.jpg

# Should return: 200 OK
# NOT 404 or connection refused
```

## What Changed in Code

1. **MovieCard.jsx**: Updated `getImageUrl()` to replace localhost with production URL
2. **movie/[id]/page.jsx**: Updated `getImageUrl()` to use `/uploads/` path
3. **OTP Pages**: Added `withCredentials: true` to all API calls

These changes now work IF the environment variable is properly set in Vercel's dashboard.

---

**Next Action:** Set the environment variable in Vercel dashboard as described in STEP 2 above, then redeploy!
