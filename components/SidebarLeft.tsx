import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "./UserContext";

import styles from "../styles/SidebarLeft.module.css";
import TwitterIcon from "@mui/icons-material/Twitter";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/Search";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import AddIcon from "@mui/icons-material/Add";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";
import Image from "next/image";

const SidebarLeft = () => {
  const { user } = useContext(UserContext);
  // min-w-20 md:max-w-sb-left
  return (
    // add "hidden sm:block to disable on mobile
    <div className="">
      <div className="mt-2 flex h-screen flex-col xl:w-sb-left">
        <ul className="mx-2 flex flex-grow flex-col items-end justify-start gap-4 [&>*]:flex [&>*]:h-12 [&>*]:w-12 [&>*]:items-center [&>*]:justify-center [&>*]:rounded-full [&>*]:transition [&>*:hover]:bg-sky-100 [&>*:hover]:duration-200">
          <Link href="/" passHref>
            <a>
              <li>
                <div>
                  <TwitterIcon style={{ color: "#1d9bf0" }} fontSize="large" />
                </div>
              </li>
            </a>
          </Link>
          {/* <Link href="/">
          <a>
            <li>
              <HomeOutlinedIcon fontSize="large" />
            </li>
          </a>
        </Link>
        <Link href="/">
          <a>
            <li>
              <SearchOutlinedIcon fontSize="large" />
            </li>
          </a>
        </Link>
        <Link href="/">
          <a>
            <li>
              <NotificationsOutlinedIcon fontSize="large" />
            </li>
          </a>
        </Link>
        <Link href="/">
          <a>
            <li>
              <EmailOutlinedIcon fontSize="large" />
            </li>
          </a>
        </Link>
        <Link href="/">
          <a>
            <li>
              <BookmarkBorderOutlinedIcon fontSize="large" />
            </li>
          </a>
        </Link>
        <Link href="/">
          <a>
            <li>
              <ListAltOutlinedIcon fontSize="large" />
            </li>
          </a>
        </Link> */}

          {/* Profile icon */}
          {!user ? null : (
            <Link href={`/${user.username}`}>
              <a>
                <li>
                  <PersonOutlineOutlinedIcon fontSize="large" />
                </li>
              </a>
            </Link>
          )}

          {/* <Link href="/">
          <a>
            <li>
              <PendingOutlinedIcon fontSize="large" />
            </li>
          </a>
        </Link>
        <Link href="/">
          <a>
            <li>
              <AddIcon fontSize="large" />
            </li>
          </a>
        </Link> */}
          {/* <li>Home</li>
      <li>Explore</li>
      <li>Notifications</li>
      <li>Messages</li>
      <li>Bookmarks</li>
      <li>Lists</li>
      <li>Profile</li>
      <li>More</li>
      <li>Compose</li> */}

          {/* <Link href="/" passHref>
        <Button
          sx={{ borderRadius: 28, textTransform: "none" }}
          component="a"
        >
          <HomeOutlinedIcon />
        </Button>
      </Link> */}
        </ul>
        <div className="flex justify-end pb-4">
          {user ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_DB_HOST}/${user.photo}`}
              width="48"
              height="48"
              alt={user.username}
              className="rounded-full"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SidebarLeft;
