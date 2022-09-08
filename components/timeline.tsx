import { Chirp, PostDisplayType } from "../lib/types";
import Post from "./post";

interface TimelineProps {
  posts: Chirp[];
}

const Timeline: React.FC<TimelineProps> = ({ posts }) => {
  return (
    <div className="divide-y">
      {posts.length > 0 ? (
        posts.map((post) => {
          return (
            <Post
              key={post.id}
              post={post}
              postType={PostDisplayType.Timeline}
            />
          );
        })
      ) : (
        <div className="flex items-center justify-center py-6">
          No posts to show
        </div>
      )}
    </div>
  );
};

export default Timeline;
