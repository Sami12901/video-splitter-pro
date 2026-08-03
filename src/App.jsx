import React, { useState, useEffect } from 'react';
import { Scissors, ShieldCheck, Film, Layers } from 'lucide-react';
import Uploader from './components/Uploader';
import ProgressBar from './components/ProgressBar';
import PartsGrid from './components/PartsGrid';
import FeaturesSection from './components/FeaturesSection';
import PrivacySection from './components/PrivacySection';
import StatsBar from './components/StatsBar';
import Footer from './components/Footer';
import { loadFFmpeg, splitVideo, extractFrames } from './utils/ffmpeg';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [mode, setMode] = useState('split'); // 'split' or 'frames'
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
      if (mode === 'split') {
        setStatus('Splitting video into 10-second parts...');
        await splitVideo(
          selectedFile,
          ffmpegInstance,
          (prog) => setProgress(prog),
          (newSegment) => {
            setSegments(prev => [...prev, newSegment].sort((a, b) => a.partNumber - b.partNumber));
          }
        );
      } else {
        setStatus('Extracting frames from video (1 frame per second)...');
        await extractFrames(
          selectedFile,
          ffmpegInstance,
          (prog) => setProgress(prog),
          (newFrame) => {
            setSegments(prev => [...prev, newFrame].sort((a, b) => a.partNumber - b.partNumber));
          }
        );
      }
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
    <div className="min-h-screen font-sans" id="top">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-primary/20 p-1.5 rounded-lg">
              <Scissors className="w-5 h-5 text-primary" />
            </div>
            <span className="font-bold text-lg tracking-tight">Video Splitter Pro</span>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#privacy" className="hover:text-foreground transition-colors">Privacy</a>
            <a
              href="https://github.com/Sami12901/video-splitter-pro"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>
          </div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">100% Private</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-12">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center justify-center p-4 bg-primary/15 rounded-2xl mb-6 ring-1 ring-primary/20"
            >
              <Scissors className="w-10 h-10 text-primary" />
            </motion.div>
            <motion.h1 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-5 bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-400 to-purple-400"
            >
              Split Videos Instantly
            </motion.h1>
            <motion.p 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
            >
              Divide any video into precise 10-second segments, or extract individual frames as images entirely within your browser. 
              No uploads, no accounts, no compromises on privacy.
            </motion.p>
            
            {!file && !isProcessing && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="flex justify-center mb-8"
              >
                <div className="bg-white/5 p-1 rounded-xl flex items-center gap-1 border border-white/10">
                  <button
                    onClick={() => setMode('split')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      mode === 'split' 
                        ? 'bg-primary text-primary-foreground shadow-lg' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                    }`}
                  >
                    <Layers className="w-4 h-4" />
                    Split Video (10s parts)
                  </button>
                  <button
                    onClick={() => setMode('frames')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      mode === 'frames' 
                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                    }`}
                  >
                    <Film className="w-4 h-4" />
                    Extract Frames (Images)
                  </button>
                </div>
              </motion.div>
            )}
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground mb-8"
            >
              {['MP4', 'MOV', 'WEBM', 'MKV'].map((fmt) => (
                <span key={fmt} className="px-3 py-1 rounded-full bg-white/5 border border-white/10">{fmt}</span>
              ))}
            </motion.div>
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
                        className="bg-white/5 hover:bg-white/10 border border-white/10 text-foreground px-6 py-2.5 rounded-full font-medium transition-all hover:scale-105"
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
      </div>

      {/* Stats Bar */}
      <StatsBar />

      {/* Features Section */}
      <div id="features">
        <FeaturesSection />
      </div>

      {/* Privacy Section */}
      <div id="privacy">
        <PrivacySection />
      </div>

      {/* Footer */}
      <Footer />
      
      {/* Background decoration */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/15 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-purple-500/15 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="fixed top-[40%] right-[-20%] w-[30%] h-[30%] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />
    </div>
  );
}

export default App;
