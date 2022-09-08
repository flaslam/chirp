import UserLayout from "../../layouts/user";
import UserPostsFromPath from "../../components/user-posts-from-path";
import { NextPageWithLayout } from "../_app";

const UserMedia: NextPageWithLayout = () => {
  return <UserPostsFromPath />;
};

UserMedia.getLayout = (page: React.ReactElement) => (
  <UserLayout>{page}</UserLayout>
);

export default UserMedia;
