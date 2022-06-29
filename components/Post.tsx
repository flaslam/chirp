import { Chirp } from "../types";
import styles from "../styles/Post.module.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import IosShareIcon from "@mui/icons-material/IosShare";
import Image from "next/image";

interface PostProps {
  post: Chirp;
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <div className={styles.postContainer}>
      <div className={styles.post}>
        <div className={styles.photoContainer}>
          <Image
            src={`${process.env.NEXT_PUBLIC_DB_HOST}/${post.photo}`}
            alt={post.username}
            layout="fill"
            // objectFit="contain"
            className={styles.photo}
          />
        </div>
        <div className={styles.postContents}>
          <div className={styles.postNameRow}>
            <div className={styles.postName}>
              <div>
                <>
                  <b>{post.displayName}</b> @{post.username} · {post.date}
                </>
              </div>
            </div>
            <div className={styles.postMore}>
              <MoreHorizIcon />
            </div>
          </div>
          <div>{post.message}</div>
        </div>
      </div>
      <div className={styles.postActions}>
        <div className={styles.iconHolder}>
          <ChatBubbleOutlineIcon /> 1
        </div>
        <div className={styles.iconHolder}>
          <AutorenewIcon /> 3
        </div>
        <div className={styles.iconHolder}>
          <FavoriteBorderOutlinedIcon /> 2
        </div>
        <div className={styles.iconHolder}>
          <IosShareIcon />
        </div>
      </div>
    </div>
  );
};

export default Post;
