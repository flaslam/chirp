import { Dialog } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { followUser } from "../lib/api-calls";
import { WhiteButton } from "./styled/button-styles";
import EditProfile from "./edit-profile";

import LinkIcon from "@mui/icons-material/Link";
import PlaceIcon from "@mui/icons-material/Place";
import CakeIcon from "@mui/icons-material/Cake";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Link from "next/link";

interface ProfileProps {
  // TODO: define user objects
  userData: any;
  user: any;
  fetchUserData(): void;
}

const Profile: React.FC<ProfileProps> = ({ userData, user, fetchUserData }) => {
  let isUser: boolean = false;
  // let isUserFollowingProfile: boolean = false;

  const [following, setFollowing] = useState<boolean>(false);

  if (user) {
    isUser = userData.username === user.username;
  } else {
    isUser = false;
  }
  // user ? (isUser = userData.username === user.username) : (isUser = false);

  // const [following, setFollowing] = useState<boolean>(false);
  const [openEditProfileDialog, setOpenEditProfileDialog] =
    useState<boolean>(false);

  // On component mount
  useEffect(() => {
    if (user) {
      // Check if following user and set following accordingly
      const isUserFollowing = userData.followers.filter(
        (item: any) => item.username === user.username
      );

      if (isUserFollowing.length > 0) {
        // The user logged in is folowing the profile page we are currently on.
        setFollowing(true);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData.followers]);

  const handleClickFollow = async () => {
    // e.preventDefault();
    const res = await followUser(user.username, userData.username, !following);
    console.log(res);

    fetchUserData();

    setFollowing((prevState) => !prevState);
  };

  return (
    <div>
      {/* Header image */}
      <div className="relative -z-50 h-48">
        <Image
          src={`${process.env.NEXT_PUBLIC_FILE_STORAGE_URL}/${
            userData.header ? userData.header : userData.photo
          }`}
          alt={userData.username}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="mx-4">
        <div className="flex">
          {/* Profile photo */}
          <div className="relative -mt-20 aspect-square h-36">
            <Image
              src={`${process.env.NEXT_PUBLIC_FILE_STORAGE_URL}/${userData.photo}`}
              fill
              alt={userData.username}
              className="z-40 m-auto rounded-full border-4 border-solid border-white object-cover"
              priority
            />
          </div>

          {/* Top button row */}
          <div className="ml-auto shrink py-2">
            {!user ? null : (
              <>
                {!isUser ? (
                  // TODO: check if current user is following this profile
                  <div>
                    <WhiteButton onClick={handleClickFollow}>
                      {!following ? "Follow" : "Unfollow"}
                    </WhiteButton>
                  </div>
                ) : (
                  // This is the user's own profile, so they can edit it.
                  <div>
                    <WhiteButton onClick={() => setOpenEditProfileDialog(true)}>
                      Edit profile
                    </WhiteButton>
                    <Dialog
                      open={openEditProfileDialog}
                      onClose={() => setOpenEditProfileDialog(false)}
                      fullWidth
                    >
                      <EditProfile
                        setOpenEditProfileDialog={setOpenEditProfileDialog}
                        userData={userData}
                        fetchUserData={fetchUserData}
                      />
                    </Dialog>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="my-2">
          {/* Display name and username */}
          <div className="my-2">
            <h2 className="text-xl font-bold">{userData.displayName}</h2>
            <h3 className="leading-none text-gray-600">@{userData.username}</h3>
          </div>

          <div className="flex flex-col gap-2 py-2 text-gray-600">
            {/* Profile description */}
            {!userData.bio ? null : <div>{userData.bio}</div>}

            {/* Profile info */}
            <div className="flex flex-row flex-wrap gap-x-4 text-sm">
              {!userData.location ? null : (
                <div className="flex items-center justify-center gap-x-1">
                  <PlaceIcon fontSize="small" />
                  {userData.location}
                </div>
              )}
              {!userData.url ? null : (
                <div className="flex items-center justify-center gap-x-1 hover:cursor-pointer hover:underline">
                  <LinkIcon fontSize="small" />
                  <span className="text-brand-link">
                    <Link href={`http://${userData.url}`} target="_blank">
                      {userData.url}
                    </Link>
                  </span>
                </div>
              )}
              {!userData.birthDate ? null : (
                <div className="flex items-center justify-center gap-x-1">
                  <CakeIcon fontSize="small" />
                  Born {userData.birthDate}
                </div>
              )}
              {!userData.joinDateFormatted ? null : (
                <div className="flex items-center justify-center gap-x-1">
                  <CalendarMonthIcon fontSize="small" />
                  Joined {userData.joinDateFormatted}
                </div>
              )}
            </div>

            {/* Profile data */}
            <div className="my-1 flex flex-row gap-4 text-sm">
              <div>
                <span className="font-bold">{userData.following.length}</span>{" "}
                Following
              </div>
              <div>
                <span className="font-bold">{userData.followers.length}</span>{" "}
                Followers
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
