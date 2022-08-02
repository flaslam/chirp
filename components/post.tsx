import { Chirp, PostDisplayType } from "../types";
import styles from "../styles/Post.module.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Image from "next/image";
import Link from "next/link";
import PostActions from "./post-actions";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./user-context";

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
            <div className="p-4 transition hover:cursor-pointer hover:bg-gray-100">
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
                  {/* New name row */}
                  <div className="flex">
                    <div className="flex grow gap-1 whitespace-nowrap">
                      <div className="truncate font-bold hover:underline">
                        <Link href={`/${post.username}`}>
                          <a>{post.displayName}</a>
                        </Link>
                      </div>
                      <div className="whitespace-nowrap text-gray-500">
                        <Link href={`/${post.username}`}>
                          <a>@{post.username}</a>
                        </Link>
                      </div>
                      <div className="whitespace-nowrap text-gray-500">·</div>
                      <div className="whitespace-nowrap text-gray-500 hover:underline">
                        <Link href={`/${post.username}/status/${post.id}`}>
                          <a>{post.date.toString()}</a>
                        </Link>
                      </div>
                    </div>
                    <div className="whitespace-nowrap text-gray-500">
                      <MoreHorizIcon />
                    </div>
                  </div>

                  {/* Message */}
                  <div>{post.message}</div>

                  {/* Media */}
                  <div className="pt-2">
                    {post.media ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_DB_HOST}/${post.media[0]}`}
                        alt={post.id}
                        width="16"
                        height="9"
                        layout="responsive"
                        objectFit="cover"
                        className="rounded-lg"
                      />
                    ) : null}
                  </div>
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
                  <div className="absolute h-full w-full">
                    <div className="flex items-center justify-center">
                      <div className="z-10 flex h-28 w-0.5 -translate-y-28 items-center justify-center bg-gray-300"></div>
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

            {/* Body */}

            <div className="py-4">
              {/* Message */}
              <p className={styles.messageMain}>{post.message}</p>

              {/* Media */}
              <div className="pt-2">
                {post.media ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_DB_HOST}/${post.media[0]}`}
                    alt={post.id}
                    width="16"
                    height="9"
                    layout="responsive"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                ) : null}
              </div>
            </div>

            <div className="text-sm text-gray-500">
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
            </div>

            <div className="mt-4 border-t py-4 text-sm text-gray-500">
              <div className="flex h-5 flex-row gap-2">
                {post.reposts && post.reposts.length > 0 ? (
                  <div>
                    <span className="font-bold">{post.reposts.length}</span>{" "}
                    {post.reposts.length > 1 ? <>Reposts</> : <>Repost</>}
                  </div>
                ) : null}
                {likes && likes.length > 0 ? (
                  <div>
                    <span className="font-bold">{likes.length}</span>{" "}
                    {likes.length > 1 ? <>Likes</> : <>Like</>}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="border-t border-b pb-4">
              <PostActions
                post={post}
                liked={liked}
                setLiked={setLiked}
                likes={likes}
                setLikes={setLikes}
              />
            </div>
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
