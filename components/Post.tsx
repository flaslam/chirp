import { Chirp, PostDisplayType } from "../types";
import styles from "../styles/Post.module.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Image from "next/image";
import Link from "next/link";
import PostActions from "./PostActions";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

interface PostProps {
  post: Chirp;
  postType?: PostDisplayType;
}

// TODO: post should have its own state because we need to update like counter
const Post: React.FC<PostProps> = ({ post, postType }) => {
  const { user } = useContext(UserContext);

  const [liked, setLiked] = useState<boolean>(false);

  // On component mount: check if liked posts contains this user
  useEffect(() => {
    if (!user) return;
    if (post.likes?.includes(user._id)) {
      setLiked(true);
    }
  }, []);

  const PostTimeline = () => {
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

  const PostMain = () => {
    return (
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
                        <div>
                          <span className={styles.displayName}>
                            {post.displayName}
                          </span>
                        </div>
                        <div>
                          <span>@{post.username}</span>
                        </div>
                      </a>
                    </Link>
                  </>
                </div>
              </div>
              <div className={styles.postMore}>
                <MoreHorizIcon />
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className={styles.messageMain}>{post.message}</p>
        </div>

        <div>
          <span>
            <>
              Time ·{" "}
              <Link href={`/${post.username}/status/${post.id}`}>
                <a>
                  <span className={styles.datePosted}>
                    {post.date.toString()}
                  </span>
                </a>
              </Link>
            </>
          </span>
          <div>
            <div>
              {post.reposts ? (
                <>
                  {post.reposts.length}{" "}
                  {post.reposts.length > 1 ? <>Reposts</> : <>Repost</>}
                </>
              ) : null}
            </div>
            <div>
              {post.likes ? (
                <>
                  {post.likes.length}{" "}
                  {post.likes.length > 1 ? <>Likes</> : <>Like</>}
                </>
              ) : null}
            </div>
          </div>
        </div>
        <PostActions post={post} liked={liked} setLiked={setLiked} />
      </div>
    );
  };

  return (
    <>
      {postType === PostDisplayType.Timeline ? <PostTimeline /> : <PostMain />}
    </>
  );
};

export default Post;
