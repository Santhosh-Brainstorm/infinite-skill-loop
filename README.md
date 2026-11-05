# Infinite Skill Loop — Installable PWA

This package turns the interactive Infinite Skill Loop demo into a Progressive Web App (PWA).

## Easiest way to install on Android
1. Upload the contents of this folder to a static HTTPS host (GitHub Pages, Netlify, or Vercel).
2. Open the hosted HTTPS link in Chrome on your Android phone.
3. Choose **Install app** from the page or Chrome menu → **Install app** / **Add to Home screen**.
4. Launch Infinite Skill Loop from your home screen.

## Local testing
A service worker requires localhost or HTTPS. From this folder run:
`py -m http.server 8000`
Then open `http://localhost:8000` on the same computer. For phone installation, use an HTTPS host.

## Included
- Web app manifest and app icons
- Service worker for app-shell caching/offline launch
- Standalone display mode
- Responsive mobile bottom navigation
- Install prompt when supported by the browser

## Demo limitations
- This remains a front-end prototype with sample users and simulated matching/requests.
- Accounts and profile data are stored locally in the browser's IndexedDB.
- Do not use real passwords or sensitive personal information.
- Offline caching covers the app shell; some Google Fonts and any future network features need internet.
- A real multi-user service needs secure authentication, a cloud database, server-side access rules, moderation, and privacy safeguards.


## Updating an existing deployment
After replacing files in GitHub, commit the changes and wait for GitHub Pages to redeploy.
On the phone, close the installed PWA completely and reopen it. If old styling remains,
refresh the site in Chrome; the service worker cache should update on the next load.

## Demo account correction
While signed in, use the **Account** button near the bottom-right account bar to update
the email and password stored in this browser's IndexedDB. This is local demo storage,
not a secure production authentication system.
