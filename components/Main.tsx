import Timeline from "./Timeline";
import Compose from "./Compose";
import styles from "../styles/Main.module.css";
import Banner from "./Banner";
import { useContext, useEffect, useState } from "react";
import { getAllPosts } from "./ApiCalls";
import { Chirp } from "../types";
import { UserContext } from "./UserContext";
import Loading from "./Loading";

interface MainProps {
  user: any;
}

const Main: React.FC<MainProps> = ({ user }) => {
  // Initialise posts with an empty array.
  const [posts, setPosts] = useState<Chirp[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  // TODO: Memoise posts to stop unnecessary reloads?

  useEffect(() => {
    // Retrieve data from server
    setLoading(true);
    const getPosts = async () => {
      // if (!user) return;

      try {
        // TODO: this get request is calling twice
        let data: Chirp[] = [];
        if (user) {
          data = await getAllPosts(user.token);
        } else {
          data = await getAllPosts();
        }

        setPosts(data);
        setLoading(false);
      } catch (err) {
        alert("Error loading posts.");
        console.log(err);
      }
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
      {loading ? <Loading /> : <Timeline posts={posts} />}
    </div>
  );
};

export default Main;
