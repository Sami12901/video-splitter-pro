import React, { useState, useEffect } from 'react';
import { Scissors } from 'lucide-react';
import Uploader from './components/Uploader';
import ProgressBar from './components/ProgressBar';
import PartsGrid from './components/PartsGrid';
import { loadFFmpeg, splitVideo } from './utils/ffmpeg';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [segments, setSegments] = useState([]);
  const [ffmpegInstance, setFfmpegInstance] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Preload ffmpeg on mount
    loadFFmpeg()
      .then(instance => setFfmpegInstance(instance))
      .catch(err => {
        console.error('Failed to load ffmpeg', err);
        setError('Failed to initialize video processor. Your browser may not support the required WebAssembly features. Please use the latest version of Chrome, Edge, or Firefox.');
      });
  }, []);

  const handleFileSelect = async (selectedFile) => {
    setFile(selectedFile);
    setIsProcessing(true);
    setProgress(0);
    setSegments([]);
    setError(null);
    setStatus('Loading video into memory...');

    if (!ffmpegInstance) {
      setError('Video processor not initialized yet. Please try again in a moment.');
      setIsProcessing(false);
      return;
    }

    try {
      setStatus('Splitting video into 10-second parts...');
      await splitVideo(
        selectedFile,
        ffmpegInstance,
        (prog) => setProgress(prog),
        (newSegment) => {
          setSegments(prev => [...prev, newSegment].sort((a, b) => a.partNumber - b.partNumber));
        }
      );
      setStatus('Processing complete!');
      setProgress(100);
    } catch (err) {
      console.error('Processing failed', err);
      setError('An error occurred while processing the video. Please try a different video or format.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setSegments([]);
    setProgress(0);
    setStatus('');
    setError(null);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center justify-center p-3 bg-primary/20 rounded-full mb-4"
          >
            <Scissors className="w-8 h-8 text-primary" />
          </motion.div>
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400"
          >
            Video Splitter Pro
          </motion.h1>
          <motion.p 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Split any video into sequential 10-second parts instantly, entirely within your browser. 
            No uploads, no waiting.
          </motion.p>
        </header>

        <main>
          {error && (
            <div className="max-w-2xl mx-auto mb-8 bg-destructive/10 border border-destructive text-destructive-foreground px-6 py-4 rounded-xl">
              <p className="font-semibold">Error</p>
              <p className="opacity-90">{error}</p>
              <button 
                onClick={() => setError(null)}
                className="mt-2 text-sm underline opacity-70 hover:opacity-100"
              >
                Dismiss
              </button>
            </div>
          )}

          <AnimatePresence mode="wait">
            {!file && !isProcessing && (
              <motion.div
                key="uploader"
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Uploader onFileSelect={handleFileSelect} />
              </motion.div>
            )}

            {(isProcessing || file) && (
              <motion.div
                key="processing"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full flex flex-col items-center"
              >
                {isProcessing && (
                  <ProgressBar progress={progress} status={status} />
                )}
                
                {segments.length > 0 && (
                  <PartsGrid segments={segments} />
                )}

                {!isProcessing && segments.length > 0 && (
                  <div className="mt-8">
                    <button 
                      onClick={handleReset}
                      className="text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
                    >
                      Split another video
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
      
      {/* Background decoration */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/20 blur-[120px] rounded-full pointer-events-none -z-10" />
    </div>
  );
}

export default App;
