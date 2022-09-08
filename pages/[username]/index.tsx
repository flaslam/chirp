import UserLayout from "../../layouts/user";
import UserPostsFromPath from "../../components/user-posts-from-path";
import { NextPageWithLayout } from "../_app";

const UserTimeline: NextPageWithLayout = () => {
  return <UserPostsFromPath />;
};

UserTimeline.getLayout = (page: React.ReactElement) => (
  <UserLayout>{page}</UserLayout>
);

export default UserTimeline;
