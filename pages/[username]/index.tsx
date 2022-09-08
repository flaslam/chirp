// import { NextLayoutComponentType, NextPage } from "next";
import UserLayout from "../../layouts/user";
import UserPagePath from "../../components/user-page-path";
import { NextLayoutComponentType } from "next";

const UserTimeline = () => {
  return <UserPagePath />;
};

UserTimeline.PageLayout = UserLayout;
// UserTimeline.getLayout = (page: React.ReactNode) => (
//   <UserLayout>{page}</UserLayout>
// );

export default UserTimeline;
