# 🚀 Firebase Deployment Guide

This guide will help you deploy your Health Navigator AI application to Firebase Hosting.

## Prerequisites

1. **Node.js and npm** installed (already have this ✅)
2. **Firebase Account** - Sign up at [https://firebase.google.com](https://firebase.google.com)
3. **Firebase CLI** - Install globally

## Step 1: Install Firebase CLI

Open PowerShell and run:

```powershell
npm install -g firebase-tools
```

## Step 2: Login to Firebase

```powershell
firebase login
```

This will open a browser window for you to authenticate with your Google account.

## Step 3: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter a project name (e.g., "health-navigator-ai")
4. Follow the setup wizard
5. **Copy your Project ID** - you'll need this!

## Step 4: Initialize Firebase in Your Project

In your project directory, run:

```powershell
firebase init
```

When prompted:
- **Select features:** Choose "Hosting" (use spacebar to select, enter to confirm)
- **Select project:** Choose the project you just created
- **Public directory:** Type `dist` and press Enter
- **Configure as single-page app:** Type `y` and press Enter
- **Set up automatic builds with GitHub:** Type `n` and press Enter
- **Overwrite existing files:** Type `n` for all (we already have the config files)

## Step 5: Update Firebase Project ID

Edit the `.firebaserc` file and replace `"your-project-id"` with your actual Firebase Project ID:

```json
{
  "projects": {
    "default": "your-actual-project-id"
  }
}
```

## Step 6: Build Your Application

```powershell
npm run build
```

This creates an optimized production build in the `dist` folder.

## Step 7: Deploy to Firebase

```powershell
npm run deploy
```

Or use the Firebase CLI directly:

```powershell
firebase deploy
```

For hosting only (faster):

```powershell
npm run deploy:hosting
```

## 🎉 Success!

After deployment, Firebase will provide you with:
- **Hosting URL:** `https://your-project-id.web.app`
- **Custom Domain URL:** `https://your-project-id.firebaseapp.com`

## Quick Deployment Commands

```powershell
# Full deployment (build + deploy)
npm run deploy

# Hosting only (faster, build + deploy hosting)
npm run deploy:hosting

# Just deploy (if already built)
firebase deploy --only hosting

# Preview locally before deploying
npm run preview
```

## Environment Variables

If you have environment variables in `.env`, make sure to:
1. Add them to your Firebase project (if using Cloud Functions)
2. Or include them in your build process (for frontend variables)

Currently configured Supabase variables should work as they're bundled at build time.

## Troubleshooting

### Build fails
```powershell
# Clear cache and rebuild
Remove-Item -Recurse -Force dist
npm run build
```

### Deployment fails
```powershell
# Check you're logged in
firebase login

# Verify project
firebase projects:list
```

### Update deployment
Just run the deploy command again - Firebase will update your site:
```powershell
npm run deploy
```

## Continuous Deployment (Optional)

For automatic deployment on git push, you can set up GitHub Actions. Let me know if you want this feature!

## Custom Domain (Optional)

To add your own domain:
1. Go to Firebase Console > Hosting
2. Click "Add custom domain"
3. Follow the DNS configuration steps

## Cost

Firebase Hosting free tier includes:
- **10 GB storage**
- **360 MB/day bandwidth**
- **Custom domain support**

Perfect for your Health Navigator AI application!

---

**Need help?** Check the [Firebase Hosting Documentation](https://firebase.google.com/docs/hosting)
