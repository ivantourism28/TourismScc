# 🔧 Troubleshooting Guide

## Common Issues & Solutions

### 1. Admin Page Shows "Page Not Found" on Vercel

**Symptoms:**
- `/admin` works on localhost
- `/admin` shows 404 on Vercel

**Solution:**
```bash
# Make sure vercel.json has the rewrite rule:
git add vercel.json
git commit -m "Fix admin route"
git push
```

**Verify:** Check that `vercel.json` contains:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

### 2. Images Don't Show Up After Upload

**Symptoms:**
- Image uploads successfully
- Image doesn't display on the page
- Broken image icon appears

**Solution A - Storage Bucket Not Public:**
1. Go to Supabase Dashboard → Storage
2. Click on `images` bucket
3. Click Settings (⚙️) icon
4. Toggle **Public bucket** to ON
5. Save

**Solution B - Wrong URL:**
1. Check browser console (F12)
2. Look for 404 errors on image URLs
3. Verify URLs start with: `https://mieuzxkqluqztiblbfnd.supabase.co/storage/v1/object/public/images/`

**Solution C - CORS Issue:**
1. Go to Supabase Dashboard → Storage → Policies
2. Verify the read policy exists for public access

---

### 3. "Loading data from Supabase..." Never Finishes

**Symptoms:**
- Admin page shows loading message forever
- No data appears

**Solution A - Tables Not Created:**
1. Go to Supabase → SQL Editor
2. Run the `supabase-setup.sql` script
3. Check for success message
4. Verify tables exist: Supabase → Table Editor

**Solution B - RLS Policies Missing:**
```sql
-- Run this in Supabase SQL Editor:
SELECT * FROM pg_policies 
WHERE schemaname = 'public';
```
Should show policies for all tables. If empty, run the SQL script again.

**Solution C - Network Error:**
1. Check browser console (F12)
2. Look for red errors
3. Check Supabase API status
4. Verify Supabase credentials in `src/lib/supabase.js`

---

### 4. Can't Add/Edit/Delete Items

**Symptoms:**
- Form submits but nothing happens
- Error in console
- Data doesn't save

**Solution A - Check Console Errors:**
1. Open browser console (F12)
2. Try to add an item
3. Look for error messages
4. Common errors:
   - "Failed to insert" → RLS policy issue
   - "Network error" → Supabase connection issue
   - "Invalid JSON" → Data format issue

**Solution B - RLS Policy Issue:**
```sql
-- Verify INSERT policy exists:
SELECT * FROM pg_policies 
WHERE tablename = 'destinations' 
AND cmd = 'INSERT';

-- If missing, run the full SQL script again
```

**Solution C - Required Fields:**
- Make sure all required fields are filled
- Check that image URL is valid
- Verify numeric fields (rating, lat, lng) have valid numbers

---

### 5. Data Shows Locally But Not on Vercel

**Symptoms:**
- Data appears on localhost
- Same data missing on Vercel

**Cause:** You're likely using different data sources.

**Solution:**
The old code used localStorage (browser-specific). The new code uses Supabase (cloud database).

1. Clear localStorage on localhost:
   ```javascript
   // In browser console:
   localStorage.clear()
   ```
2. Refresh localhost
3. Add data through admin panel
4. Data will now be in Supabase and visible everywhere

---

### 6. "Error loading from Supabase" in Console

**Symptoms:**
- Console shows error message
- No data loads
- Admin panel empty

**Solution A - Wrong Credentials:**
Check `src/lib/supabase.js`:
```javascript
const SUPABASE_URL  = 'https://mieuzxkqluqztiblbfnd.supabase.co';
const SUPABASE_ANON = 'eyJhbGci...'; // Long token
```

Verify these match your Supabase project settings.

**Solution B - Project Paused:**
1. Go to Supabase Dashboard
2. Check if project is paused (free tier projects pause after inactivity)
3. Click "Resume Project" if paused

---

### 7. Map Doesn't Show Destination Pins

**Symptoms:**
- Map loads but no pins appear
- Destinations exist in admin

**Solution:**
Add latitude and longitude to destinations:

1. Go to Admin → Destinations
2. Edit each destination
3. Add Latitude and Longitude values
4. Use [latlong.net](https://www.latlong.net/) to find coordinates
5. Example for San Carlos City: 
   - Latitude: 10.4928
   - Longitude: 123.4142

---

### 8. Page Backgrounds Don't Apply

**Symptoms:**
- Select background image in admin
- Page still shows gradient background

**Solution A - Image Not Saved:**
1. Make sure you see the "✓ Applied" badge after selecting
2. Verify in Supabase → Table Editor → page_backgrounds
3. Check if `image_url` column has the path

**Solution B - Wrong Path:**
1. Images should be in `/public/assets/` folder
2. Path should be: `/assets/filename.jpg`
3. Don't use full URLs for local assets

**Solution C - Cache Issue:**
1. Hard refresh the page (Ctrl+Shift+R)
2. Clear browser cache
3. Try incognito mode

---

### 9. Build Fails on Vercel

**Symptoms:**
- Git push successful
- Vercel deployment fails
- Build logs show errors

**Common Errors:**

**Error: "Module not found: @supabase/supabase-js"**
```bash
# Make sure dependency is in package.json:
npm install @supabase/supabase-js
git add package.json package-lock.json
git commit -m "Add Supabase dependency"
git push
```

**Error: "Failed to compile"**
- Check Vercel logs for specific error
- Usually a syntax error in code
- Test build locally: `npm run build`

---

### 10. Admin Password Doesn't Work

**Symptoms:**
- Entering password shows "Incorrect password"

**Solution:**
The default password is: `admin123`

To change it:
1. Open `src/pages/Admin.jsx`
2. Find line: `const ADMIN_PASSWORD = 'admin123';`
3. Change to your desired password
4. Save and deploy

---

## 🔍 Debugging Steps

### General Debugging Process:

1. **Check Browser Console (F12)**
   - Look for red error messages
   - Check Network tab for failed requests
   - Look at Console tab for warnings

2. **Check Supabase Dashboard**
   - Dashboard → Logs → Check for API errors
   - Table Editor → Verify data exists
   - Storage → Check images bucket

3. **Test Locally First**
   ```bash
   npm run dev
   ```
   - If it works locally but not on Vercel, it's a deployment issue
   - If it doesn't work locally, it's a code issue

4. **Check Vercel Deployment Logs**
   - Go to Vercel dashboard
   - Click on your deployment
   - Click "View Build Logs"
   - Look for errors

---

## 🆘 Still Having Issues?

### Information to Gather:

1. **Error Message:** Exact text from console
2. **Where:** Localhost or Vercel?
3. **When:** What action triggers the issue?
4. **Browser:** Chrome, Firefox, Safari?
5. **Screenshots:** Of error and console

### Quick Checks:

- [ ] Ran SQL setup script in Supabase?
- [ ] Storage bucket set to public?
- [ ] Deployed latest code to Vercel?
- [ ] Cleared browser cache?
- [ ] Checked browser console for errors?
- [ ] Verified Supabase credentials?

---

## 📚 Helpful Resources

- **Supabase Docs:** https://supabase.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **React Router Docs:** https://reactrouter.com
- **Leaflet Map Docs:** https://leafletjs.com

---

**Pro Tip:** Most issues can be solved by:
1. Checking browser console
2. Verifying SQL script ran successfully
3. Ensuring storage bucket is public
4. Hard refreshing the page (Ctrl+Shift+R)
