import { Chirp } from "../types";
import styles from "../styles/Post.module.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Image from "next/image";
import Link from "next/link";
import PostActions from "./PostActions";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

interface PostProps {
  post: Chirp;
}

// TODO: post should have its own state because we need to update like counter
const Post: React.FC<PostProps> = ({ post }) => {
  const { user } = useContext(UserContext);

  const [liked, setLiked] = useState<boolean>(false);

  useEffect(() => {
    if (!user) return;

    // Check if liked posts contains this user
    if (post.likes?.includes(user._id)) {
      setLiked(true);
    }
  }, []);

  return (
    <Link href={`/${post.username}/status/${post.id}`}>
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
        <PostActions post={post} liked={liked} setLiked={setLiked} />
      </div>
    </Link>
  );
};

export default Post;
