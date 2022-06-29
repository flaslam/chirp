import styles from "../styles/SidebarLeft.module.css";
import { Button } from "@mui/material";
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
import styled from "@emotion/styled/types/base";
import Link from "next/link";

// const sideBarButton = styled(Button)<Button

const SidebarLeft = () => {
  return (
    <div className={styles.sidebarLeftContainer}>
      <ul>
        <li>
          <Link href="/" passHref>
            <a>
              <div>
                <TwitterIcon />
              </div>
            </a>
          </Link>
        </li>
        <li>
          <Link href="">
            <a>
              <HomeOutlinedIcon />
            </a>
          </Link>
        </li>
        <li>
          <Link href="">
            <a>
              <SearchOutlinedIcon />
            </a>
          </Link>
        </li>
        <li>
          <Link href="">
            <a>
              <NotificationsOutlinedIcon />
            </a>
          </Link>
        </li>
        <li>
          <Link href="">
            <a>
              <EmailOutlinedIcon />
            </a>
          </Link>
        </li>
        <li>
          <Link href="">
            <a>
              <BookmarkBorderOutlinedIcon />
            </a>
          </Link>
        </li>
        <li>
          <Link href="">
            <a>
              <ListAltOutlinedIcon />
            </a>
          </Link>
        </li>
        <li>
          <Link href="">
            <a>
              <PersonOutlineOutlinedIcon />
            </a>
          </Link>
        </li>
        <li>
          <Link href="">
            <a>
              <PendingOutlinedIcon />
            </a>
          </Link>
        </li>
        <li>
          <Link href="">
            <a>
              <AddIcon />
            </a>
          </Link>
        </li>
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
