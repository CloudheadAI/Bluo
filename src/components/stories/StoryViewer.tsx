import { useEffect, useState } from 'react';
import type { Story } from '../../types';
import { Avatar } from '../common';

interface StoryViewerProps {
  story: Story;
  onClose: () => void;
  onNext: () => void;
}

export function StoryViewer({ story, onClose, onNext }: StoryViewerProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 5000;
    const interval = 50;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += interval;
      setProgress((elapsed / duration) * 100);
      if (elapsed >= duration) {
        clearInterval(timer);
        onNext();
      }
    }, interval);

    return () => clearInterval(timer);
  }, [story.id, onNext]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, onNext]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Story by ${story.author.displayName}`}
    >
      <div
        className="relative w-full max-w-sm mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 rounded-full overflow-hidden z-10">
          <div
            className="h-full bg-white rounded-full transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Header */}
        <div className="absolute top-4 left-4 right-4 flex items-center gap-3 z-10">
          <Avatar name={story.author.displayName} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-semibold truncate">
              {story.author.displayName}
            </p>
            <p className="text-white/60 text-[10px]">
              @{story.author.username}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white text-xl"
            aria-label="Close story"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="bg-gradient-to-b from-blue-600 to-purple-700 rounded-2xl min-h-[500px] flex items-center justify-center p-8 pt-20">
          <p className="text-white text-lg text-center leading-relaxed">
            {story.content}
          </p>
        </div>

        {/* Tap to advance */}
        <button
          onClick={onNext}
          className="absolute right-0 top-0 bottom-0 w-1/2"
          aria-label="Next story"
        />
      </div>
    </div>
  );
}
