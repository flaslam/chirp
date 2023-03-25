import React, { useContext, useEffect, useState } from "react";
import { followUser } from "../lib/api-calls";
import { UserContext } from "./user-context";

interface FollowProps {
  targetUserId: string;
  userData: any;
  children: React.ReactNode;
}

const Follow: React.FC<FollowProps> = ({
  targetUserId,
  userData,
  children,
}) => {
  const { user } = useContext(UserContext);
  const [following, setFollowing] = useState<boolean>(false);

  let isUser: boolean = false;
  user ? (isUser = user.username === user.username) : (isUser = false);

  // On component mount
  useEffect(() => {
    if (user && user.following.includes(targetUserId)) setFollowing(true);
  }, [targetUserId, user]);

  const handleFollow = async () => {
    const res = await followUser(user.username, userData.username, !following);
    console.log(res);

    setFollowing((prevState) => !prevState);
  };

  if (user) {
    isUser = userData.username === user.username;
  } else {
    isUser = false;
  }

  return <div onClick={handleFollow}>{children}</div>;
};

export default Follow;
