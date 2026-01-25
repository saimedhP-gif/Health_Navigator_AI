# Firebase Quick Deploy Script
# Run this script after updating .firebaserc with your project ID

Write-Host "🚀 Firebase Deployment Script" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check if .firebaserc has been updated
$firebaserc = Get-Content .firebaserc -Raw | ConvertFrom-Json
if ($firebaserc.projects.default -eq "your-project-id") {
    Write-Host "⚠️  Please update .firebaserc with your Firebase Project ID first!" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Steps:" -ForegroundColor White
    Write-Host "1. Go to https://console.firebase.google.com/" -ForegroundColor Gray
    Write-Host "2. Create a new project or use existing one" -ForegroundColor Gray
    Write-Host "3. Copy your Project ID" -ForegroundColor Gray
    Write-Host "4. Update .firebaserc file (replace 'your-project-id' with your actual ID)" -ForegroundColor Gray
    Write-Host ""
    exit 1
}

Write-Host "✅ Project ID configured: $($firebaserc.projects.default)" -ForegroundColor Green
Write-Host ""

# Check if logged in to Firebase
Write-Host "📝 Checking Firebase authentication..." -ForegroundColor Cyan
$loginCheck = firebase projects:list 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "🔐 Not logged in. Opening Firebase login..." -ForegroundColor Yellow
    firebase login
}

Write-Host "✅ Firebase authentication verified" -ForegroundColor Green
Write-Host ""

# Build the project
Write-Host "🔨 Building production bundle..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed! Please fix errors and try again." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build completed successfully" -ForegroundColor Green
Write-Host ""

# Deploy to Firebase
Write-Host "🚀 Deploying to Firebase Hosting..." -ForegroundColor Cyan
firebase deploy --only hosting

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "🎉 Deployment successful!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Your app is live at:" -ForegroundColor White
    Write-Host "https://$($firebaserc.projects.default).web.app" -ForegroundColor Cyan
    Write-Host "https://$($firebaserc.projects.default).firebaseapp.com" -ForegroundColor Cyan
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "❌ Deployment failed!" -ForegroundColor Red
    Write-Host "Check the error messages above for details." -ForegroundColor Yellow
}
