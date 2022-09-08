import UserLayout from "../../layouts/user";
import UserPostsFromPath from "../../components/user-posts-from-path";
import { NextPageWithLayout } from "../_app";

const WithReplies: NextPageWithLayout = () => {
  return <UserPostsFromPath />;
};

WithReplies.getLayout = (page: React.ReactElement) => (
  <UserLayout>{page}</UserLayout>
);

export default WithReplies;
