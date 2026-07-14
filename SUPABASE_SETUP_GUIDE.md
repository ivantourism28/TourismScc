# San Carlos Tourism Blog - Supabase Setup Guide

## 🎯 Overview
Your tourism blog site now uses **Supabase** as the database backend. This means all images and content you add through the admin panel will be stored permanently in the cloud and will be visible on your deployed Vercel site.

## ✅ What Has Been Fixed

1. **AdminContext.jsx** - Completely rewritten to use Supabase instead of localStorage
2. **vercel.json** - Added routing configuration to fix the `/admin` page on Vercel
3. **All Pages** - Already configured to use `image_url` from Supabase
4. **SQL Schema** - Created complete database setup script

## 📋 Setup Steps

### Step 1: Set Up Supabase Database Tables

1. Go to your Supabase project: https://supabase.com/dashboard/project/mieuzxkqluqztiblbfnd
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**
4. Open the file `supabase-setup.sql` from your project folder
5. Copy ALL the SQL code and paste it into the Supabase SQL Editor
6. Click **Run** (or press Ctrl+Enter)
7. Wait for the success message: "Success. No rows returned"

This will create:
- ✅ `destinations` table
- ✅ `blog_posts` table
- ✅ `gallery` table
- ✅ `page_backgrounds` table
- ✅ All necessary RLS (Row Level Security) policies
- ✅ Storage bucket for images

### Step 2: Verify Storage Bucket

1. In Supabase dashboard, click **Storage** in the left sidebar
2. You should see a bucket named `images`
3. Click on the `images` bucket
4. Click the **Settings** icon (⚙️) for the bucket
5. Make sure **Public bucket** is toggled ON
6. Click **Save**

### Step 3: Test Locally

1. Open your terminal in the project folder
2. Run: `npm run dev`
3. Open your browser to: http://localhost:5173
4. Navigate to: http://localhost:5173/admin
5. Enter password: `admin123`
6. Try adding a destination, blog post, or gallery item
7. Upload an image using the image picker
8. Navigate to the corresponding page (Destinations, Blog, Gallery) to verify the data appears

### Step 4: Deploy to Vercel

1. Commit all changes to your Git repository:
   ```bash
   git add .
   git commit -m "Integrated Supabase database"
   git push
   ```

2. Vercel will automatically redeploy your site
3. Wait for deployment to complete (check Vercel dashboard)
4. Visit your site: https://tourismscc1-4.vercel.app
5. Navigate to: https://tourismscc1-4.vercel.app/admin

### Step 5: Add Content Through Admin Panel

1. Go to https://tourismscc1-4.vercel.app/admin
2. Enter password: `admin123`
3. Add your destinations, blog posts, gallery items, and page backgrounds
4. All images will be uploaded to Supabase Storage
5. All data will be saved to Supabase Database

## 🎨 Using the Admin Panel

### Adding Page Backgrounds

1. Go to **Page Backgrounds** tab
2. Click **Pick Image** for any page (Home, Blog, Destinations, About, Contact, Gallery)
3. Select an image from the picker (these are your local assets in `/public/assets/`)
4. The image URL will be saved to Supabase
5. Refresh the corresponding page to see the background image

### Adding Destinations

1. Go to **Destinations** tab
2. Click **+ Add Destination**
3. Fill in all fields:
   - Name (required)
   - Location (required)
   - Description (required)
   - Activities (comma-separated)
   - Opening Hours
   - Rating (0-5)
   - **Latitude & Longitude** (for map pinpoints)
   - Image (pick from assets or paste URL)
4. Click **Add Destination**
5. The destination will appear on the Destinations page and on the map

### Adding Blog Posts

1. Go to **Articles** tab
2. Click **+ Add Article**
3. Fill in all fields:
   - Title (required)
   - Author (required)
   - Date
   - Category
   - Excerpt
   - Content (required)
   - Image (pick from assets or paste URL)
   - Featured (checkbox)
4. Click **Add Article**
5. The article will appear on the Blog page

### Adding Gallery Items

1. Go to **Gallery** tab
2. Click **+ Add Photo**
3. Fill in:
   - Title (required)
   - Photo (pick from assets or paste URL)
4. Click **Add Photo**
5. The photo will appear in the Gallery page

## 🔐 Security Note

**IMPORTANT:** The current admin panel uses a simple password (`admin123`) stored in the code. This is for development only.

For production, you should:
1. Implement proper Supabase Authentication
2. Restrict RLS policies to authenticated users only
3. Change the admin password in `src/pages/Admin.jsx`

## 🐛 Troubleshooting

### Issue: Admin page doesn't load on Vercel
**Solution:** This has been fixed with the `vercel.json` rewrite rules. Redeploy your site.

### Issue: Images don't show up
**Solution:** 
1. Make sure the `images` bucket is set to PUBLIC in Supabase Storage
2. Verify the image URLs start with: `https://mieuzxkqluqztiblbfnd.supabase.co/storage/v1/object/public/images/`
3. Check browser console for CORS errors

### Issue: Can't add/edit/delete items
**Solution:**
1. Check browser console for errors
2. Verify RLS policies are set correctly (run the SQL script again)
3. Make sure Supabase credentials in `src/lib/supabase.js` are correct

### Issue: Data doesn't persist after refresh
**Solution:** This means data is not being saved to Supabase. Check:
1. Browser console for API errors
2. Supabase dashboard > Logs for error messages
3. Network tab to see if requests are being made

## 📂 Project Structure

```
src/
├── context/
│   └── AdminContext.jsx       # ✅ Supabase CRUD operations
├── lib/
│   └── supabase.js            # ✅ Supabase client configuration
├── pages/
│   ├── Admin.jsx              # Admin panel with CRUD forms
│   ├── Home.jsx               # Uses pageBgs.home.image_url
│   ├── Blog.jsx               # Uses pageBgs.blog.image_url
│   ├── Destinations.jsx       # Uses pageBgs.destinations.image_url
│   ├── About.jsx              # Uses pageBgs.about.image_url
│   ├── Contact.jsx            # Uses pageBgs.contact.image_url
│   └── Gallery.jsx            # Uses pageBgs.gallery.image_url
└── components/
    ├── DestinationCard.jsx    # Displays destination data
    ├── BlogCard.jsx           # Displays blog post data
    └── Gallery.jsx            # Displays gallery images
```

## 🚀 Next Steps

1. ✅ Run the SQL setup script in Supabase
2. ✅ Verify storage bucket is public
3. ✅ Test locally
4. ✅ Deploy to Vercel
5. ✅ Add content through admin panel
6. 🎉 Your site is live with persistent data!

## 📞 Support

If you encounter issues:
1. Check the browser console (F12) for error messages
2. Check Supabase dashboard > Logs for API errors
3. Verify all tables were created successfully in Supabase
4. Make sure the storage bucket is public

---

**Your Supabase Project:**
- URL: https://mieuzxkqluqztiblbfnd.supabase.co
- Dashboard: https://supabase.com/dashboard/project/mieuzxkqluqztiblbfnd

**Your Vercel Deployment:**
- Site: https://tourismscc1-4.vercel.app
- Admin: https://tourismscc1-4.vercel.app/admin
