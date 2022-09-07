import { Chirp, PostDisplayType, User } from "../lib/types";
import Post from "../components/post";
import Profile from "../components/profile";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getUserProfile, getUserPosts } from "../components/api-calls";
import { UserContext } from "../components/user-context";
import Loading from "../components/loading";
import Link from "next/link";
import Banner from "./banner";

interface UserPageProps {
  params?: string;
}

// TODO: change this to a layout so we only have to re-render the posts on changing views
const UserPage: React.FC<UserPageProps> = (props) => {
  const router = useRouter();
  const username = router.query.username;

  const limit = 10;
  let skip = 0;

  const [loading, setLoading] = useState<boolean>(false);

  const { user } = useContext(UserContext);

  const [userPosts, setUserPosts] = useState<Chirp[] | null>(null);
  const [userData, setUserData] = useState<any | null>(null);

  const fetchData = async () => {
    if (!username) return;

    try {
      // TODO: change to promises.all OR have different loading for user and split that up
      const postRes = await getUserPosts(
        username as string,
        props.params,
        limit,
        skip
      );
      setUserPosts(postRes);

      const userRes = await getUserProfile(username as string);
      setUserData(userRes.data.user);

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
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, username]);

  interface ViewOption {
    title: string;
    url: string;
  }

  const viewOptions: ViewOption[] = [
    { title: "Posts", url: "" },
    { title: "Posts & replies", url: "/with_replies" },
    { title: "Media", url: "/media" },
    { title: "Likes", url: "/likes" },
  ];

  return (
    <>
      {loading ? (
        <>
          <Banner showBack={true} />
          <Loading />
        </>
      ) : (
        <>
          {!userData || !userPosts ? (
            <Banner showBack={true} />
          ) : (
            <div>
              <Banner showBack={true} headerText={userData.displayName} />
              <Profile
                userData={userData}
                user={user}
                fetchUserData={fetchData}
              />

              <div className="flex cursor-pointer border-b [&>*]:flex [&>*]:grow [&>*]:items-center [&>*]:justify-center [&>*]:font-medium [&>*]:text-gray-500 [&>*]:transition">
                {viewOptions.map((item, index) => {
                  return (
                    <Link href={`/${username}${item.url}`} key={index}>
                      <a>
                        <div
                          className={`flex h-full w-full items-center justify-center py-3 transition hover:bg-gray-100 ${
                            router.asPath == `/${username}${item.url}`
                              ? "border-b-4 border-sky-400 font-bold text-black"
                              : ""
                          }`}
                        >
                          {item.title}
                        </div>
                      </a>
                    </Link>
                  );
                })}
              </div>

              <div className="divide-y">
                {userPosts.length > 0 ? (
                  userPosts.map((post: Chirp) => {
                    return (
                      <Post
                        key={post.id}
                        post={post}
                        postType={PostDisplayType.Timeline}
                      />
                    );
                  })
                ) : (
                  <div className="flex items-center justify-center py-6">
                    No posts to show!
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default UserPage;
