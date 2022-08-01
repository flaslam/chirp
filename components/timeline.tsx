import Post from "./post";
import { Chirp, PostDisplayType } from "../types";

interface TimelineProps {
  posts: Chirp[];
}

const Timeline: React.FC<TimelineProps> = ({ posts }) => {
  return (
    <div>
      {posts.map((post, index) => {
        return (
          <Post key={post.id} post={post} postType={PostDisplayType.Timeline} />
        );
      })}
    </div>
  );
};

export default Timeline;
