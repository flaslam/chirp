import Banner from "./banner";
import Compose from "./compose";
import Loading from "./loading";
import Timeline from "./timeline";
import { useEffect, useState } from "react";
import { getAllPosts } from "./api-calls";
import { Chirp } from "../lib/types";

interface MainProps {
  user: any;
}

const Main: React.FC<MainProps> = ({ user }) => {
  // Initialise posts with an empty array.
  const [posts, setPosts] = useState<Chirp[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  // TODO: Memoise posts to stop unnecessary reloads?

  // TODO: this is loading posts twice - once without user, then once when user is loaded in on first load
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
    <>
      <Banner />
      <Compose addPost={addPost} />
      {loading ? (
        <div className="py-12">
          <Loading />
        </div>
      ) : (
        <Timeline posts={posts} />
      )}
    </>
  );
};

export default Main;
