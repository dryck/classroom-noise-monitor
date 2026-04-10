#!/bin/bash
# Publish script for sound-level-monitor

echo "🚀 Publishing Sound Level Monitor to GitHub"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "Initializing git repository..."
    git init
    git remote add origin https://github.com/dryck/sound-level-monitor.git
fi

# Build the project
echo "📦 Building project..."
npm run build

# Copy essential files to dist for deployment
cp README.md dist/
cp LICENSE dist/

# Add all files
echo "➕ Adding files to git..."
git add .

# Commit
echo "💾 Committing..."
git commit -m "Release v2.0.0 - Sound Level Monitor

- Three visual themes (Egg, Glass, Custom)
- Custom sound upload support
- PWA with offline mode
- Fullscreen and mute controls
- Professional classroom management tool"

# Push to main
echo "⬆️ Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Published successfully!"
echo "🌐 Your app will be available at: https://dryck.github.io/sound-level-monitor"
echo ""
echo "Next steps:"
echo "1. Go to https://github.com/dryck/sound-level-monitor/settings/pages"
echo "2. Enable GitHub Pages from main branch"
echo "3. Wait 2-3 minutes for deployment"
