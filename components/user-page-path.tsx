import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Chirp } from "../lib/types";
import UserPage from "../components/user-page";
import PostTimeline from "./post-timeline";
import UserLayout from "../layouts/user";
import { getUserPosts } from "./api-calls";

const UserPagePath: React.FC = () => {
  const router = useRouter();
  const username = router.query.username as string;
  const [path, setPath] = useState<string>(router.asPath);

  const limit = 10;
  let skip = 0;

  const [posts, setPosts] = useState<Chirp[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      // TODO: change to promises.all OR have different loading for user and split that up
      const postRes = await getUserPosts(username, path, limit, skip);
      setPosts(postRes);

      setLoading(false);

      skip += limit;
    } catch (err) {
      console.log("Error loading data.");
    }
  };

  // On component mount
  useEffect(() => {
    setLoading(true);

    if (!router.isReady) return;
    setPath(router.asPath);
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, username]);

  return <PostTimeline posts={posts} endpoint={path} />;
};

export default UserPagePath;
