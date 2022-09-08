import UserLayout from "../../layouts/user";
import UserPagePath from "../../components/user-page-path";
import { NextPageWithLayout } from "../_app";

const UserLikes: NextPageWithLayout = () => {
  return <UserPagePath />;
};

UserLikes.getLayout = (page: React.ReactElement) => (
  <UserLayout>{page}</UserLayout>
);

export default UserLikes;
