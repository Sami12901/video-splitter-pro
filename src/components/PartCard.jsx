import React from 'react';
import { motion } from 'framer-motion';
import { Download, PlayCircle } from 'lucide-react';
import { formatBytes, formatTime } from '../utils/ffmpeg';

export default function PartCard({ part, index }) {
  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = part.url;
    a.download = `part_${part.partNumber}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="glass-panel rounded-2xl overflow-hidden group flex flex-col"
    >
      <div className="relative aspect-video bg-black/50 overflow-hidden flex items-center justify-center">
        <video 
          src={part.url} 
          className="w-full h-full object-contain"
          controls
          preload="metadata"
        />
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h4 className="text-xl font-bold mb-1">Part {part.partNumber}</h4>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <span className="bg-secondary px-2 py-1 rounded-md">{formatTime(part.duration)}</span>
          <span>{formatBytes(part.size)}</span>
        </div>
        
        <div className="mt-auto pt-4 border-t border-white/10">
          <button 
            onClick={handleDownload}
            className="w-full bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground py-2.5 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download Part
          </button>
        </div>
      </div>
    </motion.div>
  );
}
