import UserLayout from "../../layouts/user";
import UserPostsFromPath from "../../components/user-posts-from-path";
import { NextPageWithLayout } from "../_app";

const UserLikes: NextPageWithLayout = () => {
  return <UserPostsFromPath />;
};

UserLikes.getLayout = (page: React.ReactElement) => (
  <UserLayout>{page}</UserLayout>
);

export default UserLikes;
