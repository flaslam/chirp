import Post from "./post";
import { Chirp, PostDisplayType } from "../types";

interface TimelineProps {
  posts: Chirp[];
}

const Timeline: React.FC<TimelineProps> = ({ posts }) => {
  return (
    <div className="divide-y">
      {posts.map((post) => {
        return (
          <Post key={post.id} post={post} postType={PostDisplayType.Timeline} />
        );
      })}
    </div>
  );
};

export default Timeline;
