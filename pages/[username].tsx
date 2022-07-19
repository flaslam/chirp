import { Chirp, PostDisplayType } from "../types";
import Post from "../components/Post";
import Profile from "../components/Profile";
import Back from "../components/Back";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getUser, getUserPosts } from "../components/ApiCalls";
import { UserContext } from "../components/UserContext";
import Loading from "../components/Loading";

const UserPage: React.FC = () => {
  const router = useRouter();
  const username = router.query.username;

  const [loading, setLoading] = useState<boolean>(false);

  const { user } = useContext(UserContext);

  const [userPosts, setUserPosts] = useState<Chirp[] | null>(null);
  const [userData, setUserData] = useState<any | null>(null);

  const fetchData = async () => {
    try {
      const postRes = await getUserPosts(username as string);
      setUserPosts(postRes);

      const userRes = await getUser(username as string);
      setUserData(userRes.data.user);

      setLoading(false);
    } catch (err) {
      console.log("Error loading data.");
    }
  };

  // On component mount
  useEffect(() => {
    setLoading(true);

    if (!router.isReady) return;
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, username]);

  return (
    <>
      {loading ? (
        <>
          <Back />
          <Loading />
        </>
      ) : (
        <>
          {!userData || !userPosts ? (
            <Back />
          ) : (
            <>
              <Back profileName={userData.displayName} />
              <Profile
                userData={userData}
                user={user}
                fetchUserData={fetchData}
              />
              {userPosts.map((post: Chirp) => {
                return (
                  <Post
                    key={post.id}
                    post={post}
                    postType={PostDisplayType.Timeline}
                  />
                );
              })}
            </>
          )}
        </>
      )}
    </>
  );
};

export default UserPage;
