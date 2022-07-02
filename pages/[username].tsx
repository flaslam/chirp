import { GetServerSideProps } from "next";
import { getUser, getUserPosts } from "../components/ApiCalls";
import { Chirp } from "../types";
import Post from "../components/Post";
import Profile from "../components/Profile";
import Back from "../components/Back";

interface UserPageProps {
  userData: any;
  userPosts: any;
}

const UserPage: React.FC<UserPageProps> = ({ userData, userPosts }) => {
  return (
    <div>
      <Back />
      {!userData || !userPosts ? null : (
        <>
          <Profile user={userData.user} />
          {userPosts.map((post: Chirp) => {
            return <Post key={post.id} post={post} />;
          })}
        </>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const username = context.params?.username;
  const userData = await getUser(username as string);
  const userPosts = await getUserPosts(username as string);
  return { props: { userData, userPosts } };
};

export default UserPage;
