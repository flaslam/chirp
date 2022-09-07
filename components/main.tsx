import Banner from "./banner";
import Compose from "./compose";
import Loading from "./loading";
import Timeline from "./timeline";
import { useEffect, useState } from "react";
import { getAllPosts } from "./api-calls";
import { Chirp } from "../lib/types";
import { UserContext } from "../components/user-context";
import { useContext } from "react";

interface MainProps {
  user: any;
}

const Main: React.FC<MainProps> = () => {
  const limit: number = 10;

  const [posts, setPosts] = useState<Chirp[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [skip, setSkip] = useState<number>(0);
  const [allowMore, setAllowMore] = useState<boolean>(true);

  const { user } = useContext(UserContext);

  const getPosts = async () => {
    try {
      let data: Chirp[] = [];

      if (user) {
        data = await getAllPosts(limit, skip, user.token);
      } else {
        data = await getAllPosts(limit, skip);
      }

      if (data.length > 0) {
        setPosts((prevState) => [...prevState, ...data]);
      }

      // No more posts to retrieve
      if (data.length == 0) {
        setAllowMore(false);
        return;
      }
    } catch (err) {
      alert("Error loading posts.");
      console.log(err);
    }
  };

  const resetPosts = () => {
    setPosts([]);
    setSkip(0);
  };

  const handleGetMorePosts = async () => {
    await getPosts();
    incrementSkip();
  };

  const incrementSkip = async () => {
    setSkip((prevState) => (prevState += limit));
  };

  // TODO: Memoise or cache posts to stop unnecessary reloads

  // Retrieve data from server when user changes
  // TODO: this is loading posts twice - once without user, then once when user is loaded in on first load
  useEffect(() => {
    const getInitialPosts = async () => {
      try {
        let data: Chirp[] = [];

        if (user) {
          data = await getAllPosts(limit, 0, user.token);
        } else {
          data = await getAllPosts(limit, 0);
        }

        if (data.length > 0) {
          setPosts(data);
          setSkip(limit);
        }

        setLoading(false);

        // No more posts to retrieve
        if (data.length == 0) {
          setAllowMore(false);
          return;
        }
      } catch (err) {
        alert("Error loading posts.");
        console.log(err);
      }
    };

    // Empty posts as the user has changed
    resetPosts();

    setLoading(true);

    getInitialPosts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const addPost = (post: Chirp) => {
    setPosts([post, ...posts]);
  };

  return (
    <>
      <Banner headerText="Latest Posts" showStars={true} />
      <Compose addPost={addPost} />
      {loading ? (
        <div className="py-12">
          <Loading />
        </div>
      ) : (
        <>
          <Timeline posts={posts} />
          {!allowMore ? null : (
            <div
              className="flex items-center justify-center py-4 text-sky-600"
              onClick={() => handleGetMorePosts()}
            >
              <span className="hover:cursor-pointer hover:underline">
                Show more posts
              </span>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Main;
