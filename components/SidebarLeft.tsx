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
import Link from "next/link";

import { useContext } from "react";
import { UserContext } from "./UserContext";

const SidebarLeft = () => {
  const { user } = useContext(UserContext);
  return (
    <div className={styles.sidebarLeftContainer}>
      <ul>
        <Link href="/" passHref>
          <a>
            <li>
              <div>
                <TwitterIcon style={{ color: "#1d9bf0" }} />
              </div>
            </li>
          </a>
        </Link>
        <Link href="/">
          <a>
            <li>
              <HomeOutlinedIcon />
            </li>
          </a>
        </Link>
        <Link href="/">
          <a>
            <li>
              <SearchOutlinedIcon />
            </li>
          </a>
        </Link>
        <Link href="/">
          <a>
            <li>
              <NotificationsOutlinedIcon />
            </li>
          </a>
        </Link>
        <Link href="/">
          <a>
            <li>
              <EmailOutlinedIcon />
            </li>
          </a>
        </Link>
        <Link href="/">
          <a>
            <li>
              <BookmarkBorderOutlinedIcon />
            </li>
          </a>
        </Link>
        <Link href="/">
          <a>
            <li>
              <ListAltOutlinedIcon />
            </li>
          </a>
        </Link>
        {!user ? null : (
          <Link href={`/${user.username}`}>
            <a>
              <li>
                <PersonOutlineOutlinedIcon />
              </li>
            </a>
          </Link>
        )}
        <Link href="/">
          <a>
            <li>
              <PendingOutlinedIcon />
            </li>
          </a>
        </Link>
        <Link href="/">
          <a>
            <li>
              <AddIcon />
            </li>
          </a>
        </Link>
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
    </div>
  );
};

export default SidebarLeft;
