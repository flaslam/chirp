import Post from "./Post";
import styles from "../styles/Timeline.module.css";
import { Chirp, PostDisplayType } from "../types";

interface TimelineProps {
  posts: Chirp[];
}

const Timeline: React.FC<TimelineProps> = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => {
        return (
          <Post key={post.id} post={post} postType={PostDisplayType.Timeline} />
        );
      })}
    </div>
  );
};

export default Timeline;
