import { useState } from 'react';
import { usePosts } from '../../contexts/PostsContext';
import { useGamification } from '../../contexts/GamificationContext';
import { Avatar, Button } from '../common';
import { AIToolsPanel } from '../ai/AIToolsPanel';
import { useAuth } from '../../contexts/AuthContext';

export function CreatePost() {
  const [content, setContent] = useState('');
  const [showAI, setShowAI] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addPost } = usePosts();
  const { addPoints } = useGamification();
  const { user } = useAuth();

  const handleSubmit = async () => {
    if (!content.trim()) return;
    setIsSubmitting(true);
    await addPost(content);
    addPoints(10);
    setContent('');
    setIsSubmitting(false);
  };

  const handleAISuggestion = (text: string) => {
    setContent((prev) => prev + (prev ? ' ' : '') + text);
    setShowAI(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6">
      <div className="flex gap-3">
        <Avatar name={user?.displayName || 'User'} />
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full resize-none border-0 bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 text-sm min-h-[80px]"
            aria-label="Post content"
            rows={3}
          />
          <div className="flex items-center justify-between pt-3 border-t border-gray-50">
            <div className="flex items-center gap-2">
              <button
                className="text-gray-400 hover:text-blue-500 p-1.5 rounded-lg hover:bg-blue-50 transition-colors text-sm"
                aria-label="Add image"
                title="Add image"
              >
                🖼️ Photo
              </button>
              <button
                className="text-gray-400 hover:text-blue-500 p-1.5 rounded-lg hover:bg-blue-50 transition-colors text-sm"
                aria-label="Add video"
                title="Add video"
              >
                🎬 Video
              </button>
              <button
                onClick={() => setShowAI(!showAI)}
                className={`p-1.5 rounded-lg transition-colors text-sm ${
                  showAI ? 'bg-purple-50 text-purple-500' : 'text-gray-400 hover:text-purple-500 hover:bg-purple-50'
                }`}
                aria-label="AI tools"
                aria-expanded={showAI}
              >
                ✨ AI Tools
              </button>
            </div>
            <Button
              onClick={handleSubmit}
              disabled={!content.trim()}
              isLoading={isSubmitting}
              size="sm"
            >
              Post
            </Button>
          </div>
        </div>
      </div>
      {showAI && <AIToolsPanel onInsert={handleAISuggestion} content={content} />}
    </div>
  );
}
