import { useEffect, useState, useRef } from 'react';
import type { Story } from '../../types';
import { stories as storiesApi } from '../../services/api';
import { Avatar } from '../common';
import { StoryViewer } from './StoryViewer';

export function StoriesBar() {
  const [stories, setStories] = useState<Story[]>([]);
  const [viewingIndex, setViewingIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    storiesApi.list().then(setStories).catch(() => {});
  }, []);

  if (stories.length === 0) return null;

  // Group stories by author
  const authorMap = new Map<string, Story[]>();
  for (const s of stories) {
    const key = s.author.id;
    if (!authorMap.has(key)) authorMap.set(key, []);
    authorMap.get(key)!.push(s);
  }
  const grouped = Array.from(authorMap.values());

  const handleView = (groupIndex: number) => {
    setViewingIndex(groupIndex);
    const first = grouped[groupIndex][0];
    if (!first.viewed) {
      storiesApi.markViewed(first.id).catch(() => {});
      setStories(prev => prev.map(s => (s.id === first.id ? { ...s, viewed: true } : s)));
    }
  };

  const handleClose = () => setViewingIndex(null);

  const handleNext = () => {
    if (viewingIndex !== null && viewingIndex < grouped.length - 1) {
      const nextIdx = viewingIndex + 1;
      setViewingIndex(nextIdx);
      const first = grouped[nextIdx][0];
      if (!first.viewed) {
        storiesApi.markViewed(first.id).catch(() => {});
        setStories(prev => prev.map(s => (s.id === first.id ? { ...s, viewed: true } : s)));
      }
    } else {
      handleClose();
    }
  };

  return (
    <>
      <div className="mb-6">
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
          style={{ scrollbarWidth: 'none' }}
        >
          {grouped.map((group, i) => {
            const author = group[0].author;
            const allViewed = group.every(s => s.viewed);
            return (
              <button
                key={author.id}
                onClick={() => handleView(i)}
                className="flex flex-col items-center gap-1 flex-shrink-0"
                aria-label={`View ${author.displayName}'s story`}
              >
                <div
                  className={`rounded-full p-[2px] ${
                    allViewed
                      ? 'bg-gray-200'
                      : 'bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500'
                  }`}
                >
                  <div className="rounded-full p-[2px] bg-white">
                    <Avatar name={author.displayName} size="md" />
                  </div>
                </div>
                <span className="text-[10px] text-gray-500 max-w-[60px] truncate">
                  {author.displayName.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {viewingIndex !== null && (
        <StoryViewer
          story={grouped[viewingIndex][0]}
          onClose={handleClose}
          onNext={handleNext}
        />
      )}
    </>
  );
}
