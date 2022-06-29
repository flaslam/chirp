import Timeline from "./Timeline";
import Compose from "./Compose";
import styles from "../styles/Main.module.css";
import Banner from "./Banner";
import { useEffect, useState } from "react";
import { getAllPosts } from "./ApiCalls";
import { Chirp } from "../types";

const Main = () => {
  // Initialise posts with an empty array.
  const [posts, setPosts] = useState<Chirp[]>([]);

  // TODO: Memoise posts to stop unnecessary reloads

  useEffect(() => {
    // Retrieve data from server
    const getPosts = async () => {
      const data: Chirp[] = await getAllPosts();
      setPosts(data);
    };
    getPosts();
  }, []);

  const addPost = () => {
    // ok
  };

  return (
    <div className={styles.mainContainer}>
      <Banner />
      <Compose posts={posts} setPosts={setPosts} />
      <Timeline posts={posts} />
    </div>
  );
};

export default Main;
