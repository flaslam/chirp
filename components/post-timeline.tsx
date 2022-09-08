import { PostDisplayType } from "../lib/types";
import { Chirp } from "../lib/types";
import Post from "./post";

interface PostTimelineProps {
  posts: Chirp[];
  endpoint: string;
}

const PostTimeline: React.FC<PostTimelineProps> = ({ posts, endpoint }) => {
  return (
    <>
      {posts.length > 0 ? (
        posts.map((post: Chirp) => {
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
          {/* No posts to show! */}
        </div>
      )}
    </>
  );
};

export default PostTimeline;
