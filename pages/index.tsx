import type { NextPage } from "next";
import { UserContext } from "../components/user-context";
import { useContext } from "react";
import { useEffect, useRef, useState } from "react";
import { getAllPosts } from "../components/api-calls";
import { Chirp } from "../lib/types";
import Banner from "../components/banner";
import Compose from "../components/compose";
import Loading from "../components/loading";
import Timeline from "../components/timeline";

interface HomeProps {}

const Home: NextPage<HomeProps> = ({}) => {
  const { user } = useContext(UserContext);

  const limit: number = 6;
  const skipCount = useRef<number>(0);

  const [posts, setPosts] = useState<Chirp[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [allowMore, setAllowMore] = useState<boolean>(true);

  const getPosts = async () => {
    try {
      let data: Chirp[] = [];

      if (user) {
        data = await getAllPosts(limit, skipCount.current, user.token);
      } else {
        data = await getAllPosts(limit, skipCount.current);
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
    skipCount.current = 0;
  };

  const handleGetMorePosts = async () => {
    await getPosts();
    incrementSkip(limit);
  };

  const incrementSkip = async (amount: number) => {
    skipCount.current = skipCount.current + amount;
  };

  // TODO: Memoise or cache posts to stop unnecessary reloads
  // Retrieve data from server when user changes
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
          skipCount.current = limit;
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
    <div>
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
    </div>
  );
};

export default Home;
