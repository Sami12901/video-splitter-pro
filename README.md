# Video Splitter Pro

A completely client-side, premium web application that allows you to easily split videos into 10-second segments. Built with React, Vite, Tailwind CSS v4, and FFmpeg WebAssembly.

## Features

- **100% Client-Side Processing**: Your videos never leave your device. All processing happens entirely within your browser using `ffmpeg.wasm`.
- **Lightning Fast**: Uses stream copying (`-c copy`) to segment videos instantly without re-encoding.
- **Progressive Reveal**: Watch segments appear in real-time as they finish processing.
- **Bulk Export**: Download all generated parts as a single ZIP file with one click.
- **Premium Design**: Modern, glassmorphism-inspired dark theme with ultra-smooth animations powered by Framer Motion.
- **Cross-Origin Isolated**: Employs a service worker to unlock `SharedArrayBuffer` for WebAssembly on static hosts like GitHub Pages.

## Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Video Engine**: `@ffmpeg/ffmpeg` and `@ffmpeg/core`
- **ZIP Export**: `jszip` + `file-saver`

## Setup & Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

*Note: Due to the `coi-serviceworker` handling Cross-Origin isolation for WebAssembly, the page will automatically reload once upon the first visit to inject the required security headers.*

## Deployment

This project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys the static files to GitHub Pages whenever you push to the `main` branch.
