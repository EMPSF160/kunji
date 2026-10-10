# For You — A Personal Apology & Love Letter Website

A cinematic, deeply emotional, and sincere single-page website built with **React**, **Vite**, **Tailwind CSS**, and **Framer Motion**.

Built with love, humility, and absolute respect for her peace and personal boundaries. It carries no guilt, no pressure, and no runaway buttons—only an honest confession, cherished memories, enduring promises, and a sincere heart.

---

## ✨ Features & Architecture

1. **Envelope Intro**: A 3D-styled floating wax-seal envelope. Tapping it gently unfolds the letter and starts the music (abiding by browser audio autoplay policies).
2. **Hero Section**: "Dear [Her Name]" with a typewriter subtitle, ambient glowing stars, and an interactive beating heart.
   - *Easter Egg*: Tapping the beating heart reveals a quiet, private message modal.
3. **Time Counter**: A live, real-time ticker displaying the exact years, months, days, hours, minutes, and seconds since separation.
4. **The Apology Letter**: A humble, vulnerable confession that takes 100% accountability for past mistakes with zero excuses, revealed line-by-line as she scrolls.
5. **Memory Gallery**: 3D tilt photo cards with dynamic glare sheen, featuring all photos found in `/public/photos/`, complete with memory captions and a fullscreen lightbox modal.
6. **Video Message Player**: Custom-styled video player with custom play/pause, scrubbable progress bar, volume controls, and a playlist selector for all videos in `/public/videos/`.
7. **Vinyl Turntable Music Player**: A spinning vinyl disc with animated grooves, a tonearm needle that moves onto the record when playing, frequency visualizer bars, track selector, and persistent floating sound controller.
8. **Promises Section**: 3 animated cards detailing unconditional patience, radical honesty & humility, and consistent personal growth.
9. **The Final Question**: "Can we talk again?" with two dignified options:
   - *"Yes, let's talk"*: Triggers an explosion of heart confetti, a heartfelt thank-you message, and direct contact buttons (WhatsApp with prefilled message & Phone Call).
   - *"I need more time"*: A deeply kind and patient acceptance of her pace and space without guilt or tricks.
10. **Aesthetic Design**: Midnight purple to rose-gold gradient theme, Google Fonts (*Playfair Display*, *Dancing Script*, *Inter*), animated starfield canvas with floating hearts, glassmorphism cards, and a custom desktop heart cursor.

---

## 📁 How Media Auto-Discovery Works

All your photos, videos, and music are automatically discovered at build and dev time:

- **Photos**: Place any image files (`.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`) inside `/public/photos/`.
- **Videos**: Place your clips (`.mp4`, `.mov`, `.webm`) inside `/public/videos/`.
- **Songs**: Place your music tracks (`.mp3`, `.m4a`, `.m4r`, `.wav`, `.ogg`, `.aac`) inside `/public/music/`.

Whenever you add or remove media:
- The build script (`scripts/scan-media.js`) automatically regenerates `src/media.json`.
- No code edits or hardcoded filenames needed!
- You can manually re-scan at any time by running:
  ```bash
  npm run scan
  ```

---

## ⚙️ Personalizing Details (`src/config.js`)

Open [`src/config.js`](./src/config.js) to customize all details:

```javascript
export const config = {
  // Names
  recipientName: "My Love", // Replace with her name / nickname
  senderName: "Yours Always", // Replace with your name

  // Date of separation (YYYY-MM-DD)
  separationDate: "2024-10-10T00:00:00",

  // Your honest mistake (100% accountability, no excuses)
  mistakeStatement: "I let my ego and insecurities speak when I should have listened with empathy...",

  // 3 Real Memories
  memories: [
    { title: "Our Quiet Rainy Evening", description: "Sharing that hot cup of chai..." },
    { title: "The Way Your Eyes Smiled", description: "That sudden moment when our eyes locked..." },
    { title: "Long Drives with Our Favorite Songs", description: "Windows rolled down, cold breeze..." }
  ],

  // 3 Promises
  promises: [
    { id: 1, title: "Patience Without Conditions", ... },
    { id: 2, title: "Radical Honesty & Humility", ... },
    { id: 3, title: "Consistent, Lasting Growth", ... }
  ],

  // Contact info (revealed ONLY if she clicks 'Yes, let's talk')
  contact: {
    phone: "+91 98765 43210",
    whatsappNumber: "919876543210", // Digits only with country code
    whatsappPrefill: "Hey... I went through your letter. Let's talk."
  }
};
```

---

## 🚀 Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the local development server:
   ```bash
   npm run dev
   ```
3. Open your browser at `http://localhost:3000`.

---

## 🌐 Free Deployment (Vercel or Netlify)

### Option A: Deploy with Vercel (Recommended)
1. Push your project to a private GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   # Create a repo on GitHub and push
   ```
2. Go to [vercel.com](https://vercel.com) and log in with GitHub.
3. Click **"Add New Project"** and import your repository.
4. Leave the default settings (Framework preset: `Vite`, Build command: `npm run build`, Output directory: `dist`).
5. Click **Deploy**. In under a minute, you will receive a clean public URL (e.g. `https://for-you.vercel.app`) with HTTPS and WhatsApp link previews enabled!

### Option B: Deploy with Netlify
1. Run `npm run build` locally to generate the production `dist/` folder.
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag and drop the `dist/` folder onto the page.
4. Netlify will immediately publish your website for free.

---

## 📱 WhatsApp & Social Previews

When you send her the link on WhatsApp, iMessage, or Telegram, the Open Graph meta tags defined in `index.html` will automatically generate a romantic preview card with a gentle caption and image.

---

*"Whatever you decide, I wish you happiness."*
