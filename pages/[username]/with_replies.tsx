import { NextLayoutComponentType, NextPage } from "next";
import UserLayout from "../../layouts/user";
import UserPagePath from "../../components/user-page-path";

const WithReplies = () => {
  return <UserPagePath />;
};

WithReplies.PageLayout = UserLayout;

export default WithReplies;
