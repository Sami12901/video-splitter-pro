# ✂️ Video Splitter Pro

Hey there! Welcome to **Video Splitter Pro** — a completely free, fast, and 100% private web tool for chopping up your videos into clean 10-second segments.

Whether you're prepping clips for social media, trying to bypass file size limits, or just organizing your footage, this tool gets the job done instantly right inside your browser. No sketchy server uploads, no waiting in queues, and absolutely no data tracking.

🚀 **Try it live right now:** [https://sami12901.github.io/video-splitter-pro/](https://sami12901.github.io/video-splitter-pro/)

*Note: This project was built with a nod to the powerful video editing capabilities of Google's Gemini, particularly its ability to seamlessly process and understand 10-second video segments!*

---

## ✨ Why You'll Love It

- **100% Client-Side Processing**: Your videos never leave your computer or phone. All the heavy lifting happens locally in your browser using `ffmpeg.wasm`.
- **Lightning Fast**: We use stream copying (`-c copy`) to segment your videos in the blink of an eye, without any re-encoding or quality loss.
- **Progressive Reveal**: Watch your video parts magically appear one by one as they finish processing. No need to wait for the whole thing to finish!
- **Bulk Export**: Download a single clip, or grab them all at once neatly packed in a ZIP file.
- **Sleek & Premium Design**: Enjoy a beautiful, glassmorphism-inspired dark theme with ultra-smooth animations (thanks to Framer Motion).
- **Format Friendly**: Works perfectly with MP4, MOV, WEBM, and MKV files.

## 🛠️ The Tech Behind The Magic

Curious about how it works under the hood? Here's our modern stack:
- **Core**: React 19 + Vite
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Video Engine**: `@ffmpeg/ffmpeg` and `@ffmpeg/core` (using WebAssembly)
- **ZIP Export**: `jszip` + `file-saver`

*Geeky detail: Because we need WebAssembly's `SharedArrayBuffer` for max performance, we use a clever `coi-serviceworker` to handle Cross-Origin isolation automatically on static hosts like GitHub Pages!*

## 💻 Want to run it locally?

It's super easy to get it running on your own machine:

1. Clone the repository down to your computer.
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Fire up the development server:
   ```bash
   npm run dev
   ```

*Note: When you open it locally for the very first time, the page might reload once very quickly. That's just our service worker injecting the necessary security headers so FFmpeg can do its thing!*

## 🚀 Deployment

The project is already set up to deploy automatically. The included GitHub Actions workflow (`deploy.yml`) will build and deploy the static files to GitHub Pages every time you push to the `master` branch.

---
**Privacy Guarantee:** We built this because we believe your data is yours. Video Splitter Pro doesn't even have a backend server. Happy splitting! 🎉
