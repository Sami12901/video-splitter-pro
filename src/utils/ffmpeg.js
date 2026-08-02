import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import coreURL from '@ffmpeg/core?url';
import wasmURL from '@ffmpeg/core/wasm?url';

let ffmpeg = null;

export const loadFFmpeg = async (onProgress) => {
  if (ffmpeg) return ffmpeg;

  ffmpeg = new FFmpeg();

  ffmpeg.on('progress', (e) => {
    if (onProgress) {
      onProgress(e);
    }
  });
  
  await ffmpeg.load({
    coreURL,
    wasmURL,
  });

  return ffmpeg;
};


export const splitVideo = async (file, ffmpegInstance, onProgress, onSegmentComplete) => {
  const inputFileName = 'input_video.mp4';
  
  // Write the file to memory
  await ffmpegInstance.writeFile(inputFileName, await fetchFile(file));
  
  // Get video duration using ffprobe or just reading it from a video element
  // A simpler cross-platform way is to create a temp video element:
  const duration = await new Promise((resolve) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = function() {
      window.URL.revokeObjectURL(video.src);
      resolve(video.duration);
    }
    video.src = URL.createObjectURL(file);
  });

  const segmentDuration = 10;
  const totalSegments = Math.ceil(duration / segmentDuration);
  const segments = [];

  for (let i = 0; i < totalSegments; i++) {
    const startTime = i * segmentDuration;
    const outFileName = `part_${i + 1}.mp4`;
    
    // We use time based progress relative to current segment duration
    const currentSegmentMaxDuration = Math.min(segmentDuration, duration - startTime);

    const segmentProgressHandler = ({ progress, time }) => {
       // ffmpeg gives us time in microseconds (1,000,000 = 1 sec)
       // We'll normalize it to 0-100% across ALL segments.
       const currentSegmentSecs = (time / 1000000);
       const globalSecsCompleted = startTime + currentSegmentSecs;
       const globalProgress = Math.min(100, Math.round((globalSecsCompleted / duration) * 100));
       onProgress(globalProgress);
    };

    ffmpegInstance.on('progress', segmentProgressHandler);

    // Run ffmpeg command: split from startTime for 10 seconds.
    // -c copy is fast but might break on non-keyframes. If it breaks we'll use re-encoding.
    // For now, let's use -c copy for speed as requested.
    await ffmpegInstance.exec([
      '-ss', startTime.toString(),
      '-i', inputFileName,
      '-t', segmentDuration.toString(),
      '-c', 'copy',
      outFileName
    ]);

    ffmpegInstance.off('progress', segmentProgressHandler);

    // Read result
    const fileData = await ffmpegInstance.readFile(outFileName);
    const data = new Uint8Array(fileData);
    
    // Create Blob
    const blob = new Blob([data.buffer], { type: 'video/mp4' });
    const url = URL.createObjectURL(blob);
    
    const segmentInfo = {
      partNumber: i + 1,
      blob,
      url,
      size: blob.size,
      duration: currentSegmentMaxDuration
    };
    
    segments.push(segmentInfo);
    
    // Inform UI that a segment is ready
    if (onSegmentComplete) {
      onSegmentComplete(segmentInfo);
    }
  }
  
  // Cleanup
  await ffmpegInstance.deleteFile(inputFileName);
  for (let i = 0; i < totalSegments; i++) {
    await ffmpegInstance.deleteFile(`part_${i + 1}.mp4`);
  }

  return segments;
};

// Helper for formatting sizes
export const formatBytes = (bytes, decimals = 2) => {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

// Helper for formatting time
export const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
};
