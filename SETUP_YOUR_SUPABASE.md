# 🆕 Setup Your Own Supabase Project

## You Got "Access Denied" Error?

That's because the Supabase project in the code belongs to someone else. You need to create YOUR OWN Supabase project. Don't worry - it's free and easy!

---

## Step 1: Create Supabase Account (2 minutes)

1. Go to: https://supabase.com
2. Click **"Start your project"** or **"Sign In"**
3. Sign up with:
   - GitHub account (recommended), OR
   - Email and password
4. Complete the signup process

---

## Step 2: Create New Project (3 minutes)

1. After logging in, you'll see your dashboard
2. Click **"New Project"** button (big green button)
3. Fill in these details:

   **Project Name:**
   ```
   San Carlos Tourism Blog
   ```
   (or any name you like)

   **Database Password:**
   ```
   Create a strong password and SAVE IT somewhere safe!
   Example: TourismBlog2024!Strong
   ```
   ⚠️ You'll need this password later, so save it in a text file!

   **Region:**
   ```
   Choose the closest region to you:
   - Southeast Asia (Singapore)
   - Northeast Asia (Tokyo)
   - Or whatever is closest to the Philippines
   ```

   **Pricing Plan:**
   ```
   ✅ Free tier (no credit card needed)
   ```

4. Click **"Create new project"**
5. Wait 1-2 minutes while Supabase creates your database

---

## Step 3: Get Your Credentials (2 minutes)

Once your project is ready:

1. In your Supabase dashboard, click on your new project
2. Click **Settings** (⚙️ gear icon) in the left sidebar
3. Click **API** in the Settings menu
4. You'll see a page with important information

### Copy These Two Values:

**A. Project URL**
Look for "Project URL" - it looks like:
```
https://abcdefghijk.supabase.co
```
📋 Copy this entire URL

**B. anon public Key**
Look for "Project API keys" → "anon" "public"
It's a LONG text starting with `eyJhbGci...`
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFz...
```
📋 Copy this entire key (it's very long!)

---

## Step 4: Update Your Code (2 minutes)

### 4.1 Open this file:
```
src/lib/supabase.js
```

### 4.2 Replace the values:

**BEFORE (old code with someone else's credentials):**
```javascript
const SUPABASE_URL  = 'https://mieuzxkqluqztiblbfnd.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pZXV6eGtxbHVxenRpYmxiZm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3Mzk4MzUsImV4cCI6MjA5NDMxNTgzNX0.y-H3WfUso2gbLraNGqv-4lW03aFvyLZEP69fvPYCZ_Y';
```

**AFTER (replace with YOUR credentials):**
```javascript
const SUPABASE_URL  = 'YOUR_PROJECT_URL_HERE';
const SUPABASE_ANON = 'YOUR_ANON_KEY_HERE';
```

For example:
```javascript
const SUPABASE_URL  = 'https://abcdefghijk.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3M...YOUR_FULL_KEY...';
```

### 4.3 Save the file

---

## Step 5: Setup Database Tables (5 minutes)

Now you need to create the database tables in YOUR project:

1. In Supabase dashboard, click **SQL Editor** in the left sidebar
2. Click **"New query"** button
3. Open this file from your project: `supabase-setup.sql`
4. Copy ALL the SQL code from that file (Ctrl+A, Ctrl+C)
5. Paste it into the Supabase SQL Editor (Ctrl+V)
6. Click **"Run"** button (or press Ctrl+Enter)
7. Wait for the success message: "Success. No rows returned"

✅ This creates all your database tables!

---

## Step 6: Create Storage Bucket (3 minutes)

### 6.1 Create the Bucket
1. In Supabase dashboard, click **Storage** in the left sidebar
2. Click **"New bucket"** button
3. Enter bucket name: `images`
4. Toggle **"Public bucket"** to ON (very important!)
5. Click **"Create bucket"**

### 6.2 Set Bucket Policies
1. Click on your new `images` bucket
2. Click **"Policies"** tab
3. The SQL script should have already created the policies
4. If not, click **"New policy"** and add these:
   - ✅ Allow public SELECT (read)
   - ✅ Allow public INSERT (upload)
   - ✅ Allow public UPDATE (modify)
   - ✅ Allow public DELETE (remove)

---

## Step 7: Test Locally (5 minutes)

Now test if everything works:

### 7.1 Start Development Server
```bash
npm run dev
```

### 7.2 Open Admin Panel
Go to: http://localhost:5173/admin

### 7.3 Test Adding Content
1. Enter password: `admin123`
2. Go to **Destinations** tab
3. Click **"+ Add Destination"**
4. Fill in the form
5. Pick an image
6. Click **"Add Destination"**
7. Go to **Destinations** page to see if it appears

✅ If it works, you're all set!

---

## Step 8: Deploy to Vercel (3 minutes)

Now deploy your site:

```bash
git add .
git commit -m "Updated Supabase credentials"
git push
```

Wait 2-3 minutes for Vercel to deploy, then test:
- https://tourismscc1-4.vercel.app
- https://tourismscc1-4.vercel.app/admin

---

## 🎉 You're Done!

Your site now uses YOUR OWN Supabase project with:
- ✅ Your own database
- ✅ Your own storage
- ✅ Full control
- ✅ Free tier (no credit card needed)

---

## 📋 Checklist

Use this to track your progress:

- [ ] Created Supabase account
- [ ] Created new project
- [ ] Saved database password
- [ ] Copied Project URL
- [ ] Copied anon key
- [ ] Updated src/lib/supabase.js
- [ ] Ran SQL script in Supabase
- [ ] Created storage bucket
- [ ] Set bucket to public
- [ ] Tested locally
- [ ] Deployed to Vercel
- [ ] Tested on live site

---

## 🆘 Troubleshooting

**Can't find Project URL or anon key?**
→ Go to Supabase Dashboard → Your Project → Settings → API

**SQL script fails?**
→ Make sure you copied the ENTIRE script from supabase-setup.sql

**Images don't show?**
→ Make sure storage bucket is set to PUBLIC

**Still getting "access denied"?**
→ Double-check you updated src/lib/supabase.js with YOUR credentials

---

## 📞 Quick Links

Your Supabase Dashboard:
→ https://supabase.com/dashboard

Supabase Documentation:
→ https://supabase.com/docs

---

**Good luck! Your own Supabase project is ready to use! 🚀**
