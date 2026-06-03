# Thiri Hnin Sat's Birthday Diary 🎂

A cinematic, interactive birthday diary web app — built with React + Vite.

## What it does

A full-screen animated experience that flows through:
1. **Sky Reveal** — dreamy opening scene
2. **Birthday Reveal** — "Happy 18th Birthday, Thiri Hnin Sat"
3. **Cake Scene** — decorations fly in, blow the candle
4. **Password Gate** — enter the secret code
5. **Diary** — 7 chapters of real diary entries (in Burmese)
6. **Final Page** — closing message with starfield

## Run locally

You need [Node.js](https://nodejs.org) (v18+) and [pnpm](https://pnpm.io) installed.

```bash
# Install pnpm if you don't have it
npm install -g pnpm

# Install dependencies
pnpm install

# Start the dev server
pnpm dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

## Build for production

```bash
pnpm build
```

The output goes into the `dist/` folder. You can upload that folder directly to any static host.

## Deploy to GitHub Pages (automatic)

1. Push this folder as its own GitHub repository (make it the root, not a subfolder).
2. Go to your repo → **Settings** → **Pages** → set Source to **GitHub Actions**.
3. Every push to `main` will auto-build and deploy.

Your site will be live at: `https://your-username.github.io/your-repo-name/`

## Project structure

```
birthday-diary/
├── public/
│   ├── audio/
│   │   ├── happy-birthday.m4a   # HB song (plays on first interaction)
│   │   └── 18.m4a               # One Direction "18" (plays in diary)
│   └── favicon.svg
├── src/
│   ├── pages/
│   │   ├── SkyReveal.tsx
│   │   ├── BirthdayReveal.tsx
│   │   ├── CakeScene.tsx
│   │   ├── PasswordGate.tsx
│   │   ├── Diary.tsx
│   │   └── FinalPage.tsx
│   ├── components/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .github/workflows/deploy.yml  # Auto GitHub Pages deployment
├── vite.config.ts
└── package.json
```

## Stack

- React 18 + TypeScript
- Vite 6
- Tailwind CSS v4
- Framer Motion
- Wouter (routing)
