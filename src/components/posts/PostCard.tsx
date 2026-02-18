import { useState } from 'react';
import type { Post } from '../../types';
import { usePosts } from '../../contexts/PostsContext';
import { useGamification } from '../../contexts/GamificationContext';
import { Avatar } from '../common';

function formatTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  return `${days}d`;
}

export function PostCard({ post }: { post: Post }) {
  const { likePost, sharePost, addComment } = usePosts();
  const { addPoints } = useGamification();
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    likePost(post.id);
    if (!post.isLiked) addPoints(2);
  };

  const handleShare = () => {
    sharePost(post.id);
    if (!post.isShared) addPoints(5);
  };

  const handleComment = () => {
    if (!commentText.trim()) return;
    addComment(post.id, commentText);
    addPoints(3);
    setCommentText('');
  };

  return (
    <article className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-4 transition-all duration-200 hover:shadow-sm">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <Avatar name={post.author.displayName} />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-gray-900 truncate">
              {post.author.displayName}
            </p>
            <p className="text-xs text-gray-400">
              @{post.author.username} · {formatTime(post.createdAt)}
            </p>
          </div>
        </div>

        {/* Content */}
        <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap mb-3">
          {post.content}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-6 pt-3 border-t border-gray-50">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 text-sm transition-all duration-200 ${
              post.isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
            }`}
            aria-label={post.isLiked ? 'Unlike post' : 'Like post'}
            aria-pressed={post.isLiked}
          >
            <span className={`transition-transform duration-200 ${post.isLiked ? 'scale-110' : ''}`}>
              {post.isLiked ? '❤️' : '🤍'}
            </span>
            {post.likes > 0 && <span>{post.likes}</span>}
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-blue-500 transition-colors"
            aria-label={`${post.comments.length} comments`}
            aria-expanded={showComments}
          >
            💬{' '}
            {post.comments.length > 0 && <span>{post.comments.length}</span>}
          </button>

          <button
            onClick={handleShare}
            className={`flex items-center gap-1.5 text-sm transition-colors ${
              post.isShared ? 'text-green-500' : 'text-gray-400 hover:text-green-500'
            }`}
            aria-label={post.isShared ? 'Unshare post' : 'Share post'}
            aria-pressed={post.isShared}
          >
            🔄 {post.shares > 0 && <span>{post.shares}</span>}
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-gray-50 bg-gray-50/50 p-4">
          {post.comments.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-2">No comments yet</p>
          ) : (
            <div className="space-y-3 mb-3">
              {post.comments.map((comment) => (
                <div key={comment.id} className="flex gap-2">
                  <Avatar name={comment.author.displayName} size="sm" />
                  <div className="flex-1">
                    <p className="text-xs">
                      <span className="font-semibold text-gray-900">
                        {comment.author.displayName}
                      </span>{' '}
                      <span className="text-gray-600">{comment.content}</span>
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      {formatTime(comment.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleComment()}
              placeholder="Write a comment..."
              className="flex-1 bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              aria-label="Write a comment"
            />
            <button
              onClick={handleComment}
              disabled={!commentText.trim()}
              className="text-blue-500 font-medium text-sm px-3 disabled:opacity-30 transition-opacity"
              aria-label="Submit comment"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
