import React, { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export default function DownloadAllButton({ segments }) {
  const [isZipping, setIsZipping] = useState(false);

  const handleDownloadAll = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();
      
      segments.forEach(part => {
        // add to zip
        const ext = part.type === 'image' ? 'png' : 'mp4';
        zip.file(`part_${part.partNumber}.${ext}`, part.blob);
      });

      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, 'video_parts.zip');
    } catch (err) {
      console.error("Failed to zip files", err);
      alert("Failed to zip files. Please try downloading them individually.");
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <button
      onClick={handleDownloadAll}
      disabled={isZipping || segments.length === 0}
      className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-medium shadow-lg hover:shadow-primary/25 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {isZipping ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <Download className="w-5 h-5" />
      )}
      {isZipping ? 'Zipping...' : 'Download All (ZIP)'}
    </button>
  );
}
