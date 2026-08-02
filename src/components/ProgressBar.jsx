import React from 'react';
import { motion } from 'framer-motion';

export default function ProgressBar({ progress, status }) {
  return (
    <div className="w-full max-w-2xl mx-auto mt-8 glass-panel rounded-2xl p-6">
      <div className="flex justify-between items-end mb-3">
        <div>
          <h4 className="font-semibold text-lg">{status || 'Processing video...'}</h4>
          <p className="text-sm text-muted-foreground">This happens entirely in your browser.</p>
        </div>
        <span className="text-2xl font-bold text-primary">{Math.round(progress)}%</span>
      </div>
      
      <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
        <motion.div 
          className="bg-primary h-full rounded-full relative"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: 'tween', duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-white/20" style={{ backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)', backgroundSize: '1rem 1rem' }} />
        </motion.div>
      </div>
    </div>
  );
}
