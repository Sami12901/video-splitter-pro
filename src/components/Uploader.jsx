import React, { useCallback } from 'react';
import { UploadCloud, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { formatBytes } from '../utils/ffmpeg';

export default function Uploader({ onFileSelect }) {
  const [isDragActive, setIsDragActive] = React.useState(false);
  const [error, setError] = React.useState('');
  const fileInputRef = React.useRef(null);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  }, []);

  const validateAndProcessFile = (file) => {
    setError('');
    
    if (!file) return;

    // Check type
    const validTypes = ['video/mp4', 'video/quicktime', 'video/webm', 'video/x-matroska'];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(mp4|mov|webm|mkv)$/i)) {
      setError('Unsupported file type. Please upload an MP4, MOV, WEBM, or MKV.');
      return;
    }

    // Warn if large (e.g., > 200MB)
    const MAX_SIZE = 200 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      if (!window.confirm(`This file is quite large (${formatBytes(file.size)}). In-browser processing may be slow or run out of memory. Continue anyway?`)) {
        return;
      }
    }

    onFileSelect(file);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  }, [onFileSelect]);

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className={cn(
            "glass-panel rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300",
            isDragActive ? "border-primary bg-primary/10 scale-[1.02]" : "hover:bg-white/10 hover:border-white/20"
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="video/mp4,video/quicktime,video/webm,video/x-matroska"
            onChange={handleChange}
          />
          <div className="bg-primary/20 p-4 rounded-full mb-4">
            <UploadCloud className="w-10 h-10 text-primary" />
          </div>
          <h3 className="text-2xl font-semibold mb-2">Upload your video</h3>
          <p className="text-muted-foreground mb-4 max-w-md">
            Drag and drop your video file here, or click to browse. Supported formats: MP4, MOV, WEBM, MKV.
          </p>
          <button className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-medium shadow-lg hover:shadow-primary/25 transition-all active:scale-95">
            Select Video
          </button>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 bg-destructive/10 border border-destructive/20 text-destructive-foreground p-4 rounded-xl flex items-center gap-3"
          >
            <AlertCircle className="w-5 h-5 text-destructive" />
            <p>{error}</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
