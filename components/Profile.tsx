import { Button, Dialog } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { followUser } from "./ApiCalls";
import styles from "../styles/Profile.module.css";
import { WhiteButton } from "./Styled/Buttons";
import EditProfile from "./EditProfile";

interface ProfileProps {
  // TODO: define user objects
  userData: any;
  user: any;
}

const Profile: React.FC<ProfileProps> = ({ userData, user }) => {
  let isUser: boolean = false;

  if (user) {
    isUser = userData.username === user.username;
  } else {
    isUser = false;
  }
  // user ? (isUser = userData.username === user.username) : (isUser = false);

  const [following, setFollowing] = useState<boolean>(false);
  const [openEditProfileDialog, setOpenEditProfileDialog] =
    useState<boolean>(false);

  // On component mount
  useEffect(() => {
    // Check if following user and set following accordingly
  }, []);

  const handleClickFollow = async () => {
    const res = await followUser(user.username, userData.username, !following);
    console.log(res);
  };

  return (
    <div>
      <div>
        {userData.header ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_DB_HOST}/${userData.header}`}
            width="100"
            height="100"
            alt={userData.username}
          />
        ) : null}
      </div>

      <div>
        <Image
          src={`${process.env.NEXT_PUBLIC_DB_HOST}/${userData.photo}`}
          width="100"
          height="100"
          alt={userData.username}
        />
      </div>

      <div>
        <div>
          <h2>{userData.displayName}</h2>
          <h3>@{userData.username}</h3>
        </div>

        <div>
          {!user ? null : (
            <>
              {!isUser ? (
                <div>
                  <Button onClick={handleClickFollow}>Follow User</Button>
                  <Button onClick={handleClickFollow}>Unfollow User</Button>
                </div>
              ) : (
                <div>
                  <WhiteButton>Edit profile</WhiteButton>
                  <Dialog
                    open={openEditProfileDialog}
                    onClose={() => setOpenEditProfileDialog(false)}
                  >
                    <EditProfile
                      setOpenEditProfileDialog={setOpenEditProfileDialog}
                    />
                  </Dialog>
                </div>
              )}
            </>
          )}
        </div>

        <div>
          <>{console.log(userData)}</>
          <div>Following: {userData.following.length}</div>
          <div>Followers: {userData.followers.length}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
