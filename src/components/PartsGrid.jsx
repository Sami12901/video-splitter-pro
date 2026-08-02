import React from 'react';
import PartCard from './PartCard';
import DownloadAllButton from './DownloadAllButton';

export default function PartsGrid({ segments }) {
  if (!segments || segments.length === 0) return null;

  return (
    <div className="w-full max-w-6xl mx-auto mt-12 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h3 className="text-3xl font-bold">Split Results</h3>
        <DownloadAllButton segments={segments} />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {segments.map((part, index) => (
          <PartCard key={part.partNumber} part={part} index={index} />
        ))}
      </div>
    </div>
  );
}
