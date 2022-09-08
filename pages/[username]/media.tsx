import { NextPage } from "next";
import UserLayout from "../../layouts/user";
import UserPagePath from "../../components/user-page-path";

const UserMedia = () => {
  return <UserPagePath />;
};

UserMedia.PageLayout = UserLayout;

export default UserMedia;
