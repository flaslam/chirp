import Timeline from "./Timeline";
import Compose from "./Compose";
import styles from "../styles/Main.module.css";
import Banner from "./Banner";
import { useContext, useEffect, useState } from "react";
import { getAllPosts } from "./ApiCalls";
import { Chirp } from "../types";
import { UserContext } from "./UserContext";

interface MainProps {
  user: any;
}

const Main: React.FC<MainProps> = ({ user }) => {
  // Initialise posts with an empty array.
  const [posts, setPosts] = useState<Chirp[]>([]);

  // TODO: Memoise posts to stop unnecessary reloads?

  useEffect(() => {
    // Retrieve data from server
    const getPosts = async () => {
      // if (!user) return;

      // TODO: this get request is calling twice
      let data: Chirp[] = [];
      if (user) {
        data = await getAllPosts(user.token);
      } else {
        data = await getAllPosts();
      }

      setPosts(data);
    };
    getPosts();
  }, [user]);

  const addPost = (post: Chirp) => {
    setPosts([post, ...posts]);
  };

  return (
    <div className={styles.mainContainer}>
      <Banner />
      <Compose addPost={addPost} />
      <Timeline posts={posts} />
    </div>
  );
};

export default Main;
