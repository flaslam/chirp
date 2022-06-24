import Post from "./Post";
import styles from "../styles/Timeline.module.css";
import { Chirp } from "../types";
import { useEffect, useState } from "react";
import { fetchAllPosts } from "./ApiCalls";

function Timeline() {
  // Initialise posts with an empty array.
  const [posts, setPosts] = useState<Chirp[]>([]);

  useEffect(() => {
    // Retrieve data from server
    const getPosts = async () => {
      const data: Chirp[] = await fetchAllPosts();
      setPosts(data);
    };
    getPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => {
        return <Post key={post.id} post={post} />;
      })}
    </div>
  );
}

export default Timeline;
