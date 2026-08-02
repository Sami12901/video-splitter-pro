import React from 'react';
import { motion } from 'framer-motion';
import { Scissors, ExternalLink, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full mt-24 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-primary/20 p-1.5 rounded-lg">
                <Scissors className="w-4 h-4 text-primary" />
              </div>
              <span className="font-bold text-lg">Video Splitter Pro</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A free, open-source tool for splitting videos into segments entirely within your browser. No uploads, no servers, no tracking.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#top" className="hover:text-foreground transition-colors">Home</a>
              </li>
              <li>
                <a href="#features" className="hover:text-foreground transition-colors">Features</a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-foreground transition-colors">Privacy</a>
              </li>
            </ul>
          </div>

          {/* Open Source */}
          <div>
            <h4 className="font-semibold mb-3">Open Source</h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              This project is open source and available on GitHub. Feel free to contribute, report bugs, or fork the project.
            </p>
            <a
              href="https://github.com/Sami12901/video-splitter-pro"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              View on GitHub
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>&copy; 2026 Video Splitter Pro. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Inspired by Gemini Video Editing capabilities for fast 10-second cuts.
          </p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-rose-500" /> for privacy
          </p>
        </div>
      </div>
    </footer>
  );
}
