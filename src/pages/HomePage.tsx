import { PostFeed } from '../components/posts/PostFeed';
import { StoriesBar } from '../components/stories/StoriesBar';

export function HomePage() {
  return (
    <div className="max-w-xl mx-auto">
      <StoriesBar />
      <PostFeed />
    </div>
  );
}
