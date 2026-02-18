import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useGamification } from '../contexts/GamificationContext';
import { Avatar, Button } from '../components/common';
import { AIToolsPanel } from '../components/ai/AIToolsPanel';
import { usePosts } from '../contexts/PostsContext';
import { useNavigate } from 'react-router-dom';

export function CreatePostPage() {
  const [content, setContent] = useState('');
  const [showAI, setShowAI] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const { addPost } = usePosts();
  const { addPoints } = useGamification();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!content.trim()) return;
    setIsSubmitting(true);
    await addPost(content);
    addPoints(10);
    setContent('');
    setIsSubmitting(false);
    navigate('/');
  };

  const handleAISuggestion = (text: string) => {
    setContent((prev) => prev + (prev ? ' ' : '') + text);
    setShowAI(false);
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Avatar name={user?.displayName || 'User'} />
          <h1 className="text-lg font-bold text-gray-900">Create Post</h1>
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full resize-none border border-gray-200 rounded-xl bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm p-4 min-h-[150px]"
          aria-label="Post content"
          rows={6}
        />

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <button
              className="text-gray-400 hover:text-blue-500 p-2 rounded-lg hover:bg-blue-50 transition-colors text-sm"
              aria-label="Add image"
            >
              🖼️ Photo
            </button>
            <button
              className="text-gray-400 hover:text-blue-500 p-2 rounded-lg hover:bg-blue-50 transition-colors text-sm"
              aria-label="Add video"
            >
              🎬 Video
            </button>
            <button
              onClick={() => setShowAI(!showAI)}
              className={`p-2 rounded-lg transition-colors text-sm ${
                showAI ? 'bg-purple-50 text-purple-500' : 'text-gray-400 hover:text-purple-500 hover:bg-purple-50'
              }`}
              aria-label="AI tools"
              aria-expanded={showAI}
            >
              ✨ AI Tools
            </button>
          </div>
          <Button onClick={handleSubmit} disabled={!content.trim()} isLoading={isSubmitting}>
            Publish
          </Button>
        </div>

        {showAI && <AIToolsPanel onInsert={handleAISuggestion} content={content} />}
      </div>
    </div>
  );
}
