# 🌴 San Carlos City Tourism Blog

A modern, full-featured tourism blog and destination guide for San Carlos City, Negros Occidental, Philippines. Built with React, powered by Supabase, and deployed on Vercel.

## ✨ Features

- 🏝️ **Interactive Destinations** - Browse attractions with detailed information, ratings, and activities
- 📝 **Blog Platform** - Read travel guides, tips, and stories with category filtering
- 📸 **Photo Gallery** - Explore beautiful images of San Carlos City
- 🗺️ **Interactive Map** - View tourist spots on an interactive Leaflet map with pinpoints
- ⚙️ **Admin Panel** - Full CRUD functionality to manage all content
- 🎨 **Dynamic Page Backgrounds** - Customize header images for each page
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- ☁️ **Cloud Storage** - Images and data stored in Supabase for persistence

## 🚀 Live Demo

- **Website:** https://tourismscc1-4.vercel.app
- **Admin Panel:** https://tourismscc1-4.vercel.app/admin (password: `admin123`)

## 🛠️ Tech Stack

- **Frontend:** React 19, React Router 7
- **Styling:** CSS3 with custom design
- **Database:** Supabase (PostgreSQL)
- **Storage:** Supabase Storage
- **Maps:** Leaflet + React Leaflet
- **Build Tool:** Vite 8
- **Deployment:** Vercel
- **Package Manager:** npm

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Supabase account
- Vercel account (for deployment)

### Local Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd "Toursim Blog Site"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Supabase:**
   - Create a Supabase project at https://supabase.com
   - Update credentials in `src/lib/supabase.js`
   - Run the SQL script from `supabase-setup.sql` in Supabase SQL Editor
   - Set the `images` storage bucket to public

4. **Run development server:**
   ```bash
   npm run dev
   ```

5. **Open browser:**
   Navigate to http://localhost:5173

## 📚 Documentation

- **[Setup Guide](SUPABASE_SETUP_GUIDE.md)** - Detailed Supabase setup instructions
- **[Deployment Checklist](DEPLOYMENT_CHECKLIST.md)** - Quick deployment steps
- **[Troubleshooting](TROUBLESHOOTING.md)** - Common issues and solutions
- **[Changes Summary](CHANGES_SUMMARY.md)** - Overview of recent changes

## 🎯 Quick Start

### 1. Setup Database
```bash
# In Supabase SQL Editor, run:
cat supabase-setup.sql
# Copy and paste the SQL into Supabase SQL Editor
```

### 2. Build and Deploy
```bash
npm run build          # Build for production
git add .              # Stage changes
git commit -m "Setup"  # Commit
git push               # Deploy to Vercel (auto)
```

### 3. Add Content
1. Visit `/admin` on your deployed site
2. Enter password: `admin123`
3. Add destinations, blog posts, gallery items, and page backgrounds

## 📁 Project Structure

```
src/
├── components/
│   ├── BlogCard.jsx           # Blog post card component
│   ├── DestinationCard.jsx    # Destination card component
│   ├── Footer.jsx             # Site footer
│   ├── Gallery.jsx            # Gallery grid component
│   ├── Header.jsx             # Navigation header
│   ├── TestimonialSection.jsx # Testimonials component
│   └── TouristMap.jsx         # Interactive Leaflet map
├── context/
│   └── AdminContext.jsx       # Supabase CRUD operations
├── data/
│   └── touristicData.js       # Static data (legacy)
├── lib/
│   └── supabase.js            # Supabase client config
├── pages/
│   ├── About.jsx              # About page
│   ├── Admin.jsx              # Admin panel
│   ├── Blog.jsx               # Blog listing page
│   ├── BlogDetail.jsx         # Single blog post page
│   ├── Contact.jsx            # Contact page
│   ├── Destinations.jsx       # Destinations listing
│   ├── Gallery.jsx            # Gallery page
│   └── Home.jsx               # Homepage
├── styles/
│   └── *.css                  # Component styles
├── App.jsx                    # Main app component
├── App.css                    # Global styles
├── index.css                  # Root styles
└── main.jsx                   # Entry point
```

## 🎨 Admin Panel Features

### Destinations Management
- Add/Edit/Delete destinations
- Image picker for local assets
- Coordinates for map pinpointing
- Activities, hours, ratings
- Full CRUD operations

### Blog Management
- Add/Edit/Delete articles
- Category organization
- Featured posts
- Rich content editor
- Image uploads

### Gallery Management
- Add/Edit/Delete photos
- Grid preview
- Bulk operations

### Page Backgrounds
- Customize header images
- Visual asset picker
- Instant preview
- Per-page customization

## 🗄️ Database Schema

### Tables
- `destinations` - Tourist attractions and spots
- `blog_posts` - Blog articles and stories
- `gallery` - Photo gallery images
- `page_backgrounds` - Page header backgrounds

### Storage
- `images` bucket - User-uploaded images (public)

See `supabase-setup.sql` for full schema.

## 🔐 Security

**Current Setup (Development):**
- Simple password protection (`admin123`)
- Public read/write access to database
- No user authentication

**Recommended for Production:**
- Implement Supabase Authentication
- Add RLS policies for authenticated users only
- Use environment variables for sensitive data
- Add CAPTCHA to contact forms
- Implement rate limiting

## 🚢 Deployment

### Vercel (Automatic)
1. Connect repository to Vercel
2. Vercel auto-deploys on push to main
3. Build command: `npm run build`
4. Output directory: `dist`

### Manual Build
```bash
npm run build
npm run preview  # Test production build locally
```

## 🔧 Configuration

### Change Admin Password
Edit `src/pages/Admin.jsx`:
```javascript
const ADMIN_PASSWORD = 'your-new-password';
```

### Update Supabase Credentials
Edit `src/lib/supabase.js`:
```javascript
const SUPABASE_URL = 'your-project-url';
const SUPABASE_ANON = 'your-anon-key';
```

### Customize Branding
- Update logo: `public/assets/Tourismlogo1.1.png`
- Update favicon: `public/favicon.svg`
- Modify colors in CSS files

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🐛 Troubleshooting

**Admin page 404 on Vercel?**
- Check `vercel.json` has rewrite rules
- Redeploy after updating config

**Images don't show up?**
- Verify Supabase storage bucket is public
- Check image URLs in browser console

**Can't add/edit items?**
- Run SQL setup script in Supabase
- Verify RLS policies are set correctly

See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for more solutions.

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👥 Authors

- **San Carlos City Tourism Team**
- Contact: info@sancarlosblog.com

## 🙏 Acknowledgments

- San Carlos City Government
- Local tourism operators
- Community contributors
- Open source libraries used in this project

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Email: info@sancarlosblog.com
- Visit: San Carlos City Tourism Office

---

**Built with ❤️ for San Carlos City, Negros Occidental, Philippines**

🌴 Discover the paradise in the heart of San Carlos! 🌴
