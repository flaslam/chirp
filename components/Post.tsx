import { Chirp } from "../types";
import styles from "../styles/Post.module.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import IosShareIcon from "@mui/icons-material/IosShare";
import Image from "next/image";
import Link from "next/link";

interface PostProps {
  post: Chirp;
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <Link href={`/${post.username}/status/${post.id}`}>
      <a>
        <div className={styles.postContainer}>
          <div className={styles.post}>
            <div className={styles.photoContainer}>
              <Link href={`/${post.username}`} style={{ position: "relative" }}>
                <a>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_DB_HOST}/${post.photo}`}
                    alt={post.username}
                    // layout="fill"
                    width="100"
                    height="100"
                    className={styles.photo}
                  />
                </a>
              </Link>
            </div>
            <div className={styles.postContents}>
              <div className={styles.postNameRow}>
                <div className={styles.postName}>
                  <div>
                    <>
                      <Link href={`/${post.username}`}>
                        <a>
                          <span>
                            <span className={styles.displayName}>
                              {post.displayName}
                            </span>{" "}
                            @{post.username}
                          </span>
                        </a>
                      </Link>
                      <> · </>
                      <Link href={`/${post.username}/status/${post.id}`}>
                        <a>
                          <span className={styles.datePosted}>
                            {post.date.toString()}
                          </span>
                        </a>
                      </Link>
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
            <div className={styles.repliesIconHolder}>
              <ChatBubbleOutlineIcon className={styles.repliesIcon} />
              <span>
                {post.replies ? (
                  <>
                    {post.replies.length > 0 ? (
                      <>{post.replies.length}</>
                    ) : null}
                  </>
                ) : null}
              </span>
            </div>
            <div className={styles.repostsIconHolder}>
              <AutorenewIcon className={styles.repostsIcon} />
              <span>
                {post.reposts ? (
                  <>
                    {post.reposts.length > 0 ? (
                      <>{post.reposts.length}</>
                    ) : null}
                  </>
                ) : null}
              </span>
            </div>
            <div className={styles.likesIconHolder}>
              <FavoriteBorderOutlinedIcon className={styles.likesIcon} />
              <span>
                {post.likes ? (
                  <>{post.likes.length > 0 ? <>{post.likes.length}</> : null}</>
                ) : null}
              </span>
            </div>
            <div className={styles.sharesIconHolder}>
              <IosShareIcon className={styles.sharesIcon} />
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Post;
