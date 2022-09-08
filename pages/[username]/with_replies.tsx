import UserLayout from "../../layouts/user";
import UserPagePath from "../../components/user-page-path";
import { NextPageWithLayout } from "../_app";

const WithReplies: NextPageWithLayout = () => {
  return <UserPagePath />;
};

WithReplies.getLayout = (page: React.ReactElement) => (
  <UserLayout>{page}</UserLayout>
);

export default WithReplies;
