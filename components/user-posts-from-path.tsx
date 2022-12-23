import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Chirp } from "../lib/types";
import { getUserPosts } from "../lib/api-calls";
import Timeline from "./timeline";
import Loading from "./loading";

const UserPostsFromPath: React.FC = () => {
  const router = useRouter();
  const username = router.query.username as string;
  const [path, setPath] = useState<string>(router.asPath);

  const limit = 10;
  let skip = 0;

  const [posts, setPosts] = useState<Chirp[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
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

  return (
    <>
      {loading ? (
        <div className="py-3">
          <Loading />
        </div>
      ) : (
        <Timeline posts={posts} />
      )}
    </>
  );
};

export default UserPostsFromPath;
