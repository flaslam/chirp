import { Chirp } from "../types";
import Post from "../components/Post";
import Profile from "../components/Profile";
import Back from "../components/Back";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getUser, getUserPosts } from "../components/ApiCalls";
import { UserContext } from "../components/UserContext";

const UserPage: React.FC = () => {
  const router = useRouter();
  const username = router.query.username;

  const { user } = useContext(UserContext);

  const [userPosts, setUserPosts] = useState<Chirp[] | null>(null);
  const [userData, setUserData] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const postRes = await getUserPosts(username as string);
      setUserPosts(postRes);

      const userRes = await getUser(username as string);
      setUserData(userRes.data.user);
    };

    if (!router.isReady) return;
    fetchData();
  }, [router.isReady, username]);

  return (
    <>
      <Back />
      {!userData || !userPosts ? null : (
        <>
          <Profile userData={userData} user={user} />
          {userPosts.map((post: Chirp) => {
            return <Post key={post.id} post={post} />;
          })}
        </>
      )}
    </>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const username = context.params?.username;
//   const userData = await getUser(username as string);
//   const userPosts = await getUserPosts(username as string);
//   return { props: { userData, userPosts } };
// };

export default UserPage;

// import { GetServerSideProps } from "next";
// import { getUser, getUserPosts } from "../components/ApiCalls";
// import { Chirp } from "../types";
// import Post from "../components/Post";
// import Profile from "../components/Profile";
// import Back from "../components/Back";

// // interface UserPageProps {
// //   userData: any;
// //   userPosts: any;
// // }

// const UserPage: React.FC<UserPageProps> = ({ userData, userPosts }) => {
//   return (
//     <div>
//       <Back />
//       {!userData || !userPosts ? null : (
//         <>
//           <Profile user={userData.user} />
//           {userPosts.map((post: Chirp) => {
//             return (
//               <>
//                 <Post key={post.id} post={post} />
//                 <></>
//               </>
//             );
//           })}
//         </>
//       )}
//     </div>
//   );
// };

// // export const getServerSideProps: GetServerSideProps = async (context) => {
// //   const username = context.params?.username;
// //   const userData = await getUser(username as string);
// //   const userPosts = await getUserPosts(username as string);
// //   return { props: { userData, userPosts } };
// // };

// export default UserPage;
