import { Chirp, PostDisplayType } from "../types";
import Post from "../components/post";
import Profile from "../components/profile";
import Back from "../components/back";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getUser, getUserPosts } from "../components/api-calls";
import { UserContext } from "../components/user-context";
import Loading from "../components/loading";

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
            <div>
              <Back profileName={userData.displayName} />
              <Profile
                userData={userData}
                user={user}
                fetchUserData={fetchData}
              />
              <div className="divide-y">
                {userPosts.map((post: Chirp) => {
                  return (
                    <Post
                      key={post.id}
                      post={post}
                      postType={PostDisplayType.Timeline}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default UserPage;
