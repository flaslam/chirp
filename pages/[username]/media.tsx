import UserLayout from "../../layouts/user";
import UserPagePath from "../../components/user-page-path";
import { NextPageWithLayout } from "../_app";

const UserMedia: NextPageWithLayout = () => {
  return <UserPagePath />;
};

UserMedia.getLayout = (page: React.ReactElement) => (
  <UserLayout>{page}</UserLayout>
);

export default UserMedia;
