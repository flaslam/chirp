import styles from "../styles/SidebarLeft.module.css";
import { Button } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
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
          <Link href="/" passHref>
            <Button
              sx={{ borderRadius: 28, textTransform: "none" }}
              component="a"
            >
              <HomeOutlinedIcon />
              Home
            </Button>
          </Link>
        </li>
        <li>Explore</li>
        <li>Notifications</li>
        <li>Messages</li>
        <li>Bookmarks</li>
        <li>Lists</li>
        <li>Profile</li>
        <li>More</li>
        <li>Compose</li>
      </ul>
    </div>
  );
};

export default SidebarLeft;
