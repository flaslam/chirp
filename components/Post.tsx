import { Chirp, PostDisplayType } from "../types";
import styles from "../styles/Post.module.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Image from "next/image";
import Link from "next/link";
import PostActions from "./PostActions";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

interface PostProps {
  post?: Chirp;
  postType: PostDisplayType;
}

// TODO: post should have its own state because we need to update like counter
const Post: React.FC<PostProps> = ({ post, postType }) => {
  const { user } = useContext(UserContext);
  const [liked, setLiked] = useState<boolean>(false);
  const [likes, setLikes] = useState<Chirp["likes"]>(post?.likes);

  // On component mount: check if liked posts contains this user
  useEffect(() => {
    // console.log(post);
    if (!user) {
      setLiked(false);
      return;
    }

    if (post?.likes?.includes(user._id)) {
      setLiked(true);
    }

    // Initialise to an empty array
    if (!post?.likes) setLikes([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // console.log(post);
  const PostTimeline = () => {
    return (
      <>
        {!post ? (
          "There is no post"
        ) : (
          <Link href={`/${post.username}/status/${post.id}`}>
            <div className="p-4  hover:bg-gray-100 transition duration-300 hover:cursor-pointer">
              <div className={styles.post}>
                <div className={`${styles.photoContainer}`}>
                  <Link
                    href={`/${post.username}`}
                    style={{ position: "relative" }}
                  >
                    <a>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_DB_HOST}/${post.photo}`}
                        alt={post.username}
                        // layout="fill"
                        width="100"
                        height="100"
                        className={styles.photo}
                        objectFit="cover"
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
              <PostActions
                post={post}
                liked={liked}
                setLiked={setLiked}
                likes={likes}
                setLikes={setLikes}
              />
            </div>
          </Link>
        )}
      </>
    );
  };

  const PostMain = () => {
    return (
      <>
        {!post ? (
          "There is no post"
        ) : (
          <div className="p-4">
            <div className={styles.post}>
              <div className={styles.photoContainer}>
                {/* Line to link up to parent post if we have one TODO: make dynamic*/}
                {!post.parent ? null : (
                  <div className="absolute w-full h-full">
                    <div className="flex justify-center items-center">
                      <div className="w-0.5 bg-gray-300 flex items-center justify-center z-50 h-28 -translate-y-28 -z-50"></div>
                    </div>
                  </div>
                )}

                <Link
                  href={`/${post.username}`}
                  style={{ position: "relative" }}
                >
                  <a>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_DB_HOST}/${post.photo}`}
                      alt={post.username}
                      // layout="fill"
                      width="100"
                      height="100"
                      className={styles.photo}
                      objectFit="cover"
                      key={Date.now()}
                    />
                  </a>
                </Link>
              </div>

              <div className="grow">
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
            <div className="py-4">
              <p className={styles.messageMain}>{post.message}</p>
            </div>

            <div className="text-gray-500 text-sm">
              <span>
                <>
                  {/* TODO: update time */}
                  17:42 PM ·{" "}
                  <Link href={`/${post.username}/status/${post.id}`}>
                    <a>
                      <span className={styles.datePosted}>
                        {post.date.toString()}
                      </span>
                    </a>
                  </Link>
                </>
              </span>
              <div className="flex flex-row gap-2 h-5">
                {post.reposts && post.reposts.length > 0 ? (
                  <div>
                    {post.reposts.length}{" "}
                    {post.reposts.length > 1 ? <>Reposts</> : <>Repost</>}
                  </div>
                ) : null}
                {likes && likes.length > 0 ? (
                  <div>
                    {likes.length} {likes.length > 1 ? <>Likes</> : <>Like</>}
                  </div>
                ) : null}
              </div>
            </div>
            <PostActions
              post={post}
              liked={liked}
              setLiked={setLiked}
              likes={likes}
              setLikes={setLikes}
            />
          </div>
        )}
      </>
    );
  };

  return (
    <>
      {/* This conditional is unnecessary because it's done above */}
      {!post ? (
        "There is no post"
      ) : (
        <>
          {postType === PostDisplayType.Main ? <PostMain /> : <PostTimeline />}
        </>
      )}
    </>
  );
};

export default Post;
