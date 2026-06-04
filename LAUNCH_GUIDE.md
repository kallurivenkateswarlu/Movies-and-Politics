# Launch Guide for Movies & Politics

## Overview
This guide explains how to:
- preview the site locally,
- update movie and political content,
- add your mobile and email contact information,
- build the app for production,
- deploy it to the web.

## 1. Local setup and preview
1. Open a terminal in the project root: `c:\Users\venka\New folder`
2. Install dependencies if not already installed:
   - `npm install`
3. Start the local development server:
   - `npm run dev`
4. Open the app in your browser:
   - `http://localhost:5173/`

## 2. Link your mobile number and email
The footer already has a contact section using `tel:` and `mailto:` links.

To set your real details:
1. Open `src/App.jsx`.
2. Find the `CONTACT` constant near the top of the file.
3. Replace the placeholders with your actual phone number and email address:
   ```js
   const CONTACT = {
     phone: '+91-12345-67890',
     email: 'you@example.com'
   };
   ```
4. Save the file and refresh the browser.

## 3. How to add news and updates
### Movies
Movie updates are defined in the `movies` array inside `src/App.jsx`.
Each item includes fields such as:
- `title`
- `release`
- `category`
- `genre`
- `status`
- `reportType`
- `platform`
- `cast`
- `director`
- `rating`
- `description`
- `image`

To add a new movie update:
1. Open `src/App.jsx`.
2. Add a new object to the `movies` array.
3. Provide both English and Telugu text when available using fields like `title_te`, `description_te`, etc.
4. Save the file and refresh the site.

### Political news
Political items are defined in the `politicalNews` array in `src/App.jsx`.
The app now supports the following political filters:
- `All updates`
- `International`
- `National`
- `Telangana`
- `Andhra Pradesh`

To add a political update:
1. Open `src/App.jsx`.
2. Add a new object to the `politicalNews` array.
3. Set the `category` field to one of the supported sections above.
4. Save the file and refresh.

### Local news
Local items are defined in the `localNews` array.
Add any community or neighborhood story there.

## 4. How the site displays updates
### Movie section
- The main movie tab now starts with `New updates`.
- Movies can also appear in `Tollywood` or `Box Office India` views based on the `industry` and `category` fields.
- The `Latest updates` tab surfaces upcoming or recently released titles.

### Political section
- A common news list shows all political headlines first.
- A separate filtered section displays stories for the selected political category.
- Each news item should use one of the categories: `International`, `National`, `Telangana`, or `Andhra Pradesh`.

## 5. Build for production
1. In the project root, run:
   - `npm run build`
2. The production-ready files will be generated in the `dist/` folder.
3. Preview the build locally with:
   - `npm run preview`
4. Open the preview URL shown in the terminal.

## 6. Deploying to the web
### Option 1: Netlify
1. Sign up at https://www.netlify.com
2. Connect your GitHub repository or drag the `dist/` folder into Netlify.
3. Set the build command to `npm run build` and publish directory to `dist`.
4. Deploy and use the generated Netlify URL.

### Option 2: Vercel
1. Sign up at https://vercel.com
2. Import the project from GitHub.
3. Use `npm install` as install command and `npm run build` as build command.
4. Deploy and use the Vercel URL.

### Option 3: GitHub Pages
1. Build the app with `npm run build`.
2. Use a GitHub Pages deploy action or copy the `dist/` contents to the `gh-pages` branch.
3. Serve the built site from GitHub Pages.

### Custom domain
1. After deployment, point your domain to the host provider.
2. For Netlify, add the domain in site settings and update DNS records.
3. For Vercel, add the custom domain and verify ownership.

## 7. Updating the site for audience reflection
- For now, the app is a static React site. That means content changes require editing `src/App.jsx` and redeploying.
- After each content update, run `npm run build` and redeploy the `dist/` folder.
- If you want live updating without rebuilding, the next step is to connect a backend API or CMS.

## 8. Quick checklist
- [ ] Replace `CONTACT` values in `src/App.jsx`.
- [ ] Add movie updates in the `movies` array.
- [ ] Add political updates in the `politicalNews` array with the correct category.
- [ ] Add local updates in the `localNews` array.
- [ ] Run `npm run build` to verify.
- [ ] Deploy the `dist/` folder to Netlify, Vercel, or GitHub Pages.

## 9. Note on future automation
If you want updates to appear automatically for all users without manual rebuilds, consider:
- adding a backend database,
- exposing an API for news items,
- storing updates in JSON or a headless CMS,
- fetching live news via API keys.

---

This guide is designed to provide a complete local and web launch process for the Movies & Politics site.
