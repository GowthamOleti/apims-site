# District Design Hub

A clean, Apple-inspired design resource hub for internal team collaboration. Built with React, Vite, and Lucide icons. Features a polished light-mode UI with YouTube thumbnail support.

## 🚀 Features

- **React + Vite** - Modern, fast development with hot reload
- **Apple-Style UI** - Clean light-mode design with SF Pro Display fonts
- **Lucide Icons** - Beautiful, consistent iconography throughout
- **YouTube Thumbnail Support** - Automatically displays video thumbnails when you paste YouTube links
- **Resource Management** - Add, edit, and delete design resources (open to everyone for now)
- **Category Filtering** - UI Findings, Podcasts, Books, Articles, Videos, Tools, and more
- **Search** - Find resources by title, description, tags, or author
- **Detail Modal** - Click any resource card to view details, edit, or delete
- **Responsive Design** - Works beautifully on desktop and mobile

## 🎯 Quick Start

### 1. Configure Supabase

Create a `.env` file in the root directory:

```bash
VITE_SUPABASE_URL=https://YOUR-PROJECT-id.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR-ANON-PUBLIC-KEY
```

**Or** edit `src/lib/supabase.js` directly with your credentials.

**Setup Supabase Auth:**
1. Go to Supabase Dashboard > Authentication > Providers
2. Enable Google provider
3. Add your Google OAuth Client ID and Secret
4. In Authentication > URL Configuration:
   - Site URL: `http://localhost:5173` (or your production URL)
   - Redirect URLs: `http://localhost:5173/**`

### 2. Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Then open: `http://localhost:5173`

**Note:** Without Supabase configured, the app will show the login screen but won't be able to authenticate. You can still test with localStorage fallback by modifying the code temporarily.

### Deploy to Vercel

1. Push to GitHub (already done! ✅)
2. Go to [vercel.com](https://vercel.com)
3. Import repository: `GowthamOleti/district-design-hub`
4. Vercel will auto-detect Vite/React
5. Configure (should auto-fill):
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Deploy!

Vercel configuration is already in `vercel.json` ✅

## 📝 How to Use

### Adding Resources

1. Click **"+ Add New Resource"** button
2. Fill in:
   - Type (UI Finding, Podcast, Book, etc.)
   - Title
   - Description
   - URL (paste YouTube links to get thumbnails!)
   - Tags (comma-separated)
   - Your name
3. Click **"Add Resource"**

### YouTube Thumbnails

Just paste any YouTube URL and the thumbnail will automatically appear on the card:
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`

### Editing & Deleting

1. Click on any resource card
2. Modal opens with resource details
3. Click **"Edit"** to modify
4. Click **"Delete"** to remove
5. Everyone can edit/delete for now (will add permissions later)

## 🎨 Features Breakdown

- **Resource Cards** - Clean, minimal cards with type icons, title, description, and tags
- **YouTube Integration** - Automatic thumbnail detection and display (200px height, cover fit, rounded corners)
- **Detail Modal** - Full resource view with edit/delete functionality
- **Category Filters** - Quick filter by resource type
- **Search** - Real-time search across all fields
- **Empty States** - Friendly messages when no resources match
- **LocalStorage** - Data persists in browser (perfect for demos/internal use)

## 📂 Project Structure

```
district-design-hub/
├── src/
│   ├── App.jsx            # Main React app component
│   ├── main.jsx           # React entry point
│   ├── components/        # React components
│   │   ├── Sidebar.jsx
│   │   ├── Header.jsx
│   │   ├── ResourceGrid.jsx
│   │   ├── ResourceCard.jsx
│   │   ├── AddResourceModal.jsx
│   │   └── DetailModal.jsx
│   ├── styles/           # CSS files
│   └── utils/             # Helper functions
├── index.html             # Vite entry point
├── package.json
├── vite.config.js
├── vercel.json            # Vercel configuration
└── README.md
```

## 🔧 Technical Details

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Lucide React** - Beautiful icon library
- **Data storage** - localStorage (client-side)
- **Styling** - Light theme, SF Pro Display font family, Apple-inspired design
- **CSS Variables** - Easy theming and customization

## 🎯 Current Status

✅ YouTube thumbnail support
✅ Edit/delete functionality (open to all)
✅ Category filtering
✅ Search functionality
✅ Detail modal with full CRUD
✅ Sample data included
✅ Dark theme UI

## 🚧 Roadmap

- [ ] Add Supabase backend for persistence
- [ ] Add Google OAuth authentication
- [ ] Add owner-only edit/delete permissions
- [ ] Add image upload for UI Findings
- [ ] Add activity feed
- [ ] Add user profiles with contribution stats

## 📦 Deployment

### Vercel (Recommended)

Already configured for Vercel! Just import from GitHub and deploy.

### GitHub Pages

```bash
# In repository settings
Settings → Pages → Source: Deploy from a branch
Branch: main → / (root) → Save
```

Your site will be at: `https://gowthamoleti.github.io/district-design-hub/design-hub-live.html`

### Netlify

Drag and drop the `design-hub-live.html` file into Netlify.

## 🤝 Contributing

1. Open `design-hub-live.html` in your editor
2. Make changes
3. Test locally with `python3 -m http.server 3000`
4. Commit and push
5. Changes will be live after Vercel redeploys

## 📄 License

MIT

## 🎉 Credits

Built for the District design team with ❤️

---

**Live Demo:** [Coming soon after Vercel deployment]

**Repository:** https://github.com/GowthamOleti/district-design-hub

