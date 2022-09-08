import { NextPage } from "next";
import UserLayout from "../../layouts/user";
import UserPagePath from "../../components/user-page-path";

const UserLikes = () => {
  return <UserPagePath />;
};

UserLikes.PageLayout = UserLayout;

export default UserLikes;
