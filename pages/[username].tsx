import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { getUser, getUserPosts } from "../components/ApiCalls";
import { Chirp } from "../types";
import Post from "../components/Post";

interface UserPageProps {
  userData: any;
  userPosts: any;
}

const UserPage: React.FC<UserPageProps> = ({ userData, userPosts }) => {
  const router = useRouter();
  const username = router.query.username;

  const [user, setUser] = useState<any | null>(null);
  const [post, setPost] = useState<Chirp | null>(null);
  const [replies, setReplies] = useState();

  useEffect(() => {
    const fetchData = async () => {
      // const res = await getPost(postId as string, username as string);
      // setPost(res.data.post);
      // const res = await getUser()
    };

    if (router.isReady) {
      // fetchData();
    }
  }, [router.isReady]);

  return (
    <div>
      <>{console.log(userData)}</>
      <div>{userData.user.displayName}</div>
      <div>{userData.user.username}</div>
      <div>{userData.user.photo}</div>
      {/* {!userData ? null : (
        <div>
          <div>{post?.message}</div>
          <div>show all replies here</div>
        </div>
      )} */}
      {userPosts.map((post: Chirp) => {
        return <Post key={post.id} post={post} />;
      })}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const username = context.params?.username;
  const userPosts = await getUserPosts(username as string);
  const userData = await getUser(username as string);
  // const userData = null;
  return { props: { userData, userPosts } };
};

export default UserPage;
