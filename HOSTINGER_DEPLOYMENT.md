# Hostinger Deployment Guide - Unbiased Relief Website

## 📦 Production Build Ready

Your website is ready for deployment to Hostinger! The `dist/` folder contains all files needed for hosting.

## ✅ Build Summary

- **Build Status**: ✓ Successfully compiled
- **Build Time**: 12.81 seconds
- **Total Size**: 1.1 MB (compressed)
- **Main Entry File**: `dist/index.html`

## 📂 Dist Folder Contents

```
dist/
├── index.html                    # Main HTML entry point (1.5 KB)
├── assets/
│   ├── index-D14Lik9Y.css       # Compiled CSS styles (66 KB, gzipped: 11.71 KB)
│   ├── index-x7r5GNmj.js        # Compiled JavaScript (469 KB, gzipped: 144.95 KB)
│   ├── hero-relief-supplies-ZY-M_pG1.jpg     # Hero image (186 KB)
│   ├── drive-hygiene-kits-CbuMOhbK.jpg       # Campaign image (112 KB)
│   ├── drive-medical-supplies-DXuVOJvp.jpg   # Campaign image (112 KB)
│   └── drive-school-supplies-BbRLIzwK.jpg    # Campaign image (96 KB)
├── favicon.ico                   # Icon file (7.5 KB)
├── heart-favicon.svg             # SVG icon (253 B)
├── placeholder.svg               # Placeholder image
└── robots.txt                    # SEO robots file (174 B)
```

## 🚀 Deployment Steps for Hostinger

### Step 1: Connect to Your Hostinger Account
1. Log in to your Hostinger control panel
2. Navigate to **File Manager** or **cPanel**
3. Locate the **public_html** folder (your website root)

### Step 2: Upload Files
**Option A: Using File Manager (Recommended)**
1. Select all contents of the `dist/` folder on your local machine
2. Drag and drop them into the `public_html` folder in Hostinger
3. Or use "Upload" button and select all dist files

**Option B: Using FTP**
1. Connect via FTP using your Hostinger FTP credentials
2. Navigate to `public_html` folder
3. Upload all files from the `dist/` folder

### Step 3: Verify Deployment
1. Visit your domain (e.g., `https://unbiasedrelief.org`)
2. Check that the page loads with:
   - ✓ Header with logo
   - ✓ Chat button (bottom-right corner)
   - ✓ All pages navigate correctly
   - ✓ Images load properly
   - ✓ Responsive design works on mobile

### Step 4: Configure SSL (HTTPS)
1. In Hostinger panel, go to **SSL Certificate**
2. Install a free SSL certificate (usually Auto-enabled)
3. Ensure site redirects from http:// to https://

## 🔧 Important Configuration

### Environment Variables
The site uses one environment variable for the DeepSeek API:
- **VITE_DEEPSEEK_API_KEY**: Already configured in `.env.local` during build

If you need to update the API key:
1. Rebuild locally: `npm run build`
2. Redeploy the `dist/` folder

### Static Hosting Notes
- ✓ No server-side processing needed
- ✓ All routes use SPA (Single Page Application) routing
- ✓ HTML5 history API requires server configuration for deep links

### SPA Routing Configuration (If Needed)
If users can't access deep links (e.g., `/what-to-donate`), add this to your server:

**For Hostinger cPanel:**
1. Create a `.htaccess` file in `public_html/`
2. Add the following code:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## 📋 Features Included

✅ **Leon – Relief Support Guide Chatbot**
- AI-powered using DeepSeek API
- Comprehensive knowledge of all site pages
- Mobile-optimized interface
- Available on all pages

✅ **Responsive Design**
- Optimized for all devices (mobile, tablet, desktop)
- Touch-friendly buttons and controls
- Tested on small screens (320px+)

✅ **Complete Content**
- Header with logo and navigation
- All relief pages (What to Donate, Drop-Off & Shipping, etc.)
- About and Partners pages
- Mobile menu

✅ **Performance Optimized**
- CSS: 11.71 KB gzipped
- JavaScript: 144.95 KB gzipped
- Images optimized and cached
- Fast load times

## 🔗 External Resources

The site links to external resources:
- Jamaica Consulate General: https://jcgtoronto.ca/melissa/
- Government of Jamaica: https://supportjamaica.gov.jm/needs
- Jamaica Customs: https://jca.gov.jm/list-of-disaster-relief-items-for-individuals/
- Leon avatar: https://unbiasedrelief.org/Images/Leon.jpg
- Header logos: https://unbiasedrelief.org/Images/UnbiasedReliefs.png
- Heart icon: https://unbiasedrelief.org/Images/heart.png

## 🆘 Troubleshooting

### Issue: Pages don't load on direct navigation
**Solution**: Add `.htaccess` file as shown in "SPA Routing Configuration"

### Issue: Images not displaying
**Solution**:
1. Ensure all image files in `dist/assets/` are uploaded
2. Check image URLs in browser console (F12)
3. Verify image file paths are correct

### Issue: Chat button not working
**Solution**:
1. Check browser console for errors (F12)
2. Ensure JavaScript files loaded correctly
3. Verify API key is set if updating responses

### Issue: Styles not applying
**Solution**:
1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh (Ctrl+F5)
3. Verify CSS file loaded (check Network tab in F12)

## 📊 SEO Configuration

The site includes:
- ✓ Meta tags for search engines
- ✓ Open Graph tags for social sharing
- ✓ Twitter card metadata
- ✓ Robots.txt file
- ✓ Responsive design (Google Mobile-Friendly)
- ✓ Proper page titles and descriptions

## 🔄 Updates & Maintenance

To update the site:
1. Make changes locally
2. Run `npm run build`
3. Re-upload the `dist/` folder to Hostinger
4. Clear browser cache and visit your site

## 📞 Support

If you need to rebuild or update:
- React + TypeScript codebase is in the project root
- All components are in `src/components/`
- All pages are in `src/pages/`
- Configuration is in `src/lib/leonKnowledgeBase.ts` for chatbot

## ✨ Additional Notes

- The site uses modern CSS and JavaScript (compatible with all modern browsers)
- No server-side database needed
- All chatbot responses use DeepSeek AI API
- Website is fully static except for API calls to DeepSeek

---

**Deployment Date**: November 4, 2025
**Build Version**: Production Ready
**Status**: Ready for Hostinger hosting
