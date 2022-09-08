import UserLayout from "../../layouts/user";
import UserPagePath from "../../components/user-page-path";
import { NextPageWithLayout } from "../_app";

const UserTimeline: NextPageWithLayout = () => {
  return <UserPagePath />;
};

UserTimeline.getLayout = (page: React.ReactElement) => (
  <UserLayout>{page}</UserLayout>
);

export default UserTimeline;
