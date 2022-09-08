import type { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getUserProfile } from "../components/api-calls";
import { UserContext } from "../components/user-context";
import Loading from "../components/loading";
import Link from "next/link";
import Profile from "../components/profile";
import Banner from "../components/banner";

interface UserLayoutProps {
  children: React.ReactNode;
}

const UserLayout: NextPage<UserLayoutProps> = ({ children }) => {
  const { user } = useContext(UserContext);

  const router = useRouter();
  const username = router.query.username;

  const [path, setPath] = useState<string>(router.asPath);
  const [loading, setLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<any | null>(null);

  const fetchData = async () => {
    if (!username) return;

    try {
      const userRes = await getUserProfile(username as string);
      setUserData(userRes.data.user);
      setLoading(false);
    } catch (err) {
      console.log("Error loading data.");
    }
  };

  // On component mount
  useEffect(() => {
    setPath(router.asPath);
    setLoading(true);

    if (!router.isReady) return;

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, username]);

  // Set path whenever it changes
  useEffect(() => {
    console.log("updating path");
    setPath(router.asPath);
  }, [router]);

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
          {!userData ? (
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
                            path == `/${username}${item.url}`
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

              <div className="divide-y">{children}</div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default UserLayout;
