# 🚀 Deployment Checklist

## Quick Setup (Do This Now!)

### ✅ Step 1: Setup Supabase Database (5 minutes)

1. Open: https://supabase.com/dashboard/project/mieuzxkqluqztiblbfnd
2. Click **SQL Editor** (left sidebar)
3. Click **New Query**
4. Open file: `supabase-setup.sql` (in your project folder)
5. Copy ALL the SQL code
6. Paste into Supabase SQL Editor
7. Click **Run** button
8. Wait for "Success" message

### ✅ Step 2: Verify Storage Bucket (2 minutes)

1. In Supabase, click **Storage** (left sidebar)
2. Click on `images` bucket
3. Click Settings icon (⚙️)
4. Toggle **Public bucket** to ON
5. Click **Save**

### ✅ Step 3: Deploy to Vercel (3 minutes)

```bash
# In your project folder terminal:
git add .
git commit -m "Added Supabase database integration"
git push
```

Wait 2-3 minutes for Vercel to automatically redeploy.

### ✅ Step 4: Test Your Site

1. Visit: https://tourismscc1-4.vercel.app
2. Visit admin: https://tourismscc1-4.vercel.app/admin
3. Enter password: `admin123`
4. Add a test destination or blog post
5. Navigate to the page to verify it shows up

## 🎉 You're Done!

Your site now has:
- ✅ Working admin panel on Vercel
- ✅ Persistent database storage (Supabase)
- ✅ Image uploads that work in production
- ✅ All pages showing dynamic content

## 📝 What Changed

### Files Modified:
1. **src/context/AdminContext.jsx** - Now uses Supabase instead of localStorage
2. **vercel.json** - Added routing for /admin page

### Files Created:
1. **supabase-setup.sql** - Database schema setup
2. **SUPABASE_SETUP_GUIDE.md** - Detailed setup instructions
3. **DEPLOYMENT_CHECKLIST.md** - This file

### Already Configured:
- ✅ Supabase client in `src/lib/supabase.js`
- ✅ All pages using `image_url` from Supabase
- ✅ Image picker in admin panel
- ✅ CRUD operations for destinations, blogs, gallery, page backgrounds

## 🔧 Admin Panel Usage

### Password
- Current password: `admin123`
- Change it in: `src/pages/Admin.jsx` (line with `ADMIN_PASSWORD`)

### Adding Content

**Destinations:**
- Name, Location, Description (required)
- Image (pick from assets)
- Activities, Opening Hours, Rating
- **Latitude & Longitude** (for map pins) - Get from [latlong.net](https://www.latlong.net/)

**Blog Posts:**
- Title, Author, Content (required)
- Category, Excerpt, Date
- Image (pick from assets)
- Featured checkbox (shows on homepage)

**Gallery:**
- Title (required)
- Image (pick from assets)

**Page Backgrounds:**
- Pick an image for any page header
- Changes save instantly

## 🐛 If Something Doesn't Work

### Admin page doesn't load on Vercel?
- Make sure you pushed the updated `vercel.json` file
- Check Vercel deployment logs
- Wait for deployment to finish (check Vercel dashboard)

### Images don't show up?
- Verify storage bucket is PUBLIC in Supabase
- Check browser console (F12) for errors
- Verify image URLs in the data

### Can't add/edit items?
- Check browser console for errors
- Verify SQL script ran successfully
- Check Supabase dashboard > Logs

### Data doesn't save?
- Verify Supabase credentials in `src/lib/supabase.js`
- Check RLS policies in Supabase
- Look at browser Network tab for failed requests

## 📞 Quick Links

- **Supabase Dashboard:** https://supabase.com/dashboard/project/mieuzxkqluqztiblbfnd
- **Live Site:** https://tourismscc1-4.vercel.app
- **Admin Panel:** https://tourismscc1-4.vercel.app/admin
- **Vercel Dashboard:** https://vercel.com/dashboard

## 🎯 What to Do Next

1. ✅ Run the SQL setup script
2. ✅ Push to Git/Vercel
3. ✅ Test admin panel on live site
4. ✅ Start adding your real content
5. 🎨 Customize the design if needed
6. 📱 Test on mobile devices
7. 🔐 Consider adding proper authentication for production

---

**Need the full guide?** → Read `SUPABASE_SETUP_GUIDE.md`
