import styles from "../styles/Post.module.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Image from "next/image";
import Link from "next/link";
import PostActions from "./post-actions";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./user-context";
import { Chirp, PostDisplayType } from "../lib/types";
import { deletePost } from "./api-calls";
import { useRouter } from "next/router";

interface PostProps {
  post?: Chirp;
  postType: PostDisplayType;
}

// TODO: post should have its own state because we need to update like counter
const Post: React.FC<PostProps> = ({ post, postType }) => {
  const { user } = useContext(UserContext);
  const [liked, setLiked] = useState<boolean>(false);
  const [likes, setLikes] = useState<Chirp["likes"]>(post?.likes);

  const router = useRouter();

  const [showMore, setShowMore] = useState<boolean>(false);

  // On user change: check if liked posts contains this user
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

  const handleMore = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    setShowMore((prevState) => !prevState);
  };

  const handleDelete = async (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    setShowMore(false);

    if (post?.id && post?.username && user) {
      try {
        await deletePost(post?.username, post?.id, user.token);
      } catch (err) {
        console.log(err);
        alert("Could not delete post.");
        return;
      }
    } else {
      alert("Could not delete post.");
      return;
    }

    alert("Post has been deleted");

    await router.push("/");
    router.reload();
  };

  const moreIcon = () => {
    return (
      <>
        <div className="">
          <div
            className={`${
              showMore ? "absolute" : "hidden"
            } z-10 flex w-60 -translate-x-full flex-col overflow-hidden rounded-md bg-white drop-shadow-lg [&>*]:p-2`}
          >
            {post?.username === user?.username ? (
              <div
                className="truncate hover:bg-gray-300"
                onClick={handleDelete}
              >
                Delete post
              </div>
            ) : (
              <div className="truncate hover:bg-gray-300">
                <Link href={`/${post?.username}`}>
                  <a>Go to @{post?.username}&#39;s profile</a>
                </Link>
              </div>
            )}
            <div className="truncate hover:bg-gray-300">
              <Link href={`/${post?.username}/status/${post?.id}`}>
                <a>
                  {/* Share/copy URL */}
                  Go to post page
                </a>
              </Link>
            </div>
          </div>
          <div
            className="rounded-full text-gray-500 transition hover:cursor-pointer hover:bg-gray-300"
            onClick={handleMore}
          >
            <MoreHorizIcon />
          </div>
        </div>
      </>
    );
  };

  const showRelativeOrNormalDate = () => {
    // If date is less than a day, show time posted relative to now
    let dateToDisplay = post?.date.toString();

    if (post?.dateRaw) {
      const timePosted = new Date(post.dateRaw).getTime();
      const currTime = new Date().getTime();
      const diff = currTime - timePosted;
      const timeInDaysSincePost = diff / (1000 * 60 * 60 * 24);

      if (timeInDaysSincePost < 1) {
        dateToDisplay = post.dateRelative;
      }
    }

    return <>{dateToDisplay}</>;
  };

  // console.log(post);
  const PostTimeline = () => {
    return (
      <>
        {!post ? (
          "There is no post"
        ) : (
          <Link href={`/${post.username}/status/${post.id}`}>
            <div
              className={`p-4 transition hover:cursor-pointer ${
                showMore ? null : "hover:bg-gray-100"
              }`}
            >
              <div className={styles.post}>
                <div className={`${styles.photoContainer}`}>
                  <Link
                    href={`/${post.username}`}
                    style={{ position: "relative" }}
                  >
                    <a>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_FILE_STORAGE_URL}/${post.photo}`}
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
                  {/* Name row */}
                  <div className="flex">
                    <div className="flex grow gap-1">
                      <div className="truncate font-bold hover:underline">
                        <Link href={`/${post.username}`}>
                          <a>{post.displayName}</a>
                        </Link>
                      </div>
                      <div className="truncate text-gray-500">
                        <Link href={`/${post.username}`}>
                          <a>@{post.username}</a>
                        </Link>
                      </div>
                      <div className="text-gray-500">·</div>
                      <div className="text-gray-500 hover:underline">
                        <Link href={`/${post.username}/status/${post.id}`}>
                          <a>{showRelativeOrNormalDate()}</a>
                        </Link>
                      </div>
                    </div>

                    {moreIcon()}
                  </div>

                  {/* Message */}
                  <div>{post.message}</div>

                  {/* Media */}
                  <div className="pt-2">
                    {post.media && post.media.length > 0 ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_FILE_STORAGE_URL}/${post.media[0]}`}
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
                showStats={true}
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
                      <div className="h-96 w-0.5 -translate-y-full bg-gray-300" />
                    </div>
                  </div>
                )}

                <Link
                  href={`/${post.username}`}
                  style={{ position: "relative" }}
                >
                  <a>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_FILE_STORAGE_URL}/${post.photo}`}
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
                  {moreIcon()}
                </div>
              </div>
            </div>

            {/* Body */}

            {!post.parent ? null : (
              <div className="pt-4">
                Replying to{" "}
                <Link href={`/${post.parent.username}`}>
                  <a className="text-sky-600 hover:underline">
                    @{post.parent.username}
                  </a>
                </Link>
              </div>
            )}

            <div className="py-4">
              {/* Message */}
              <p className={styles.messageMain}>{post.message}</p>

              {/* Media */}
              <div className="pt-2">
                {post.media && post.media.length > 0 ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_FILE_STORAGE_URL}/${post.media[0]}`}
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

            {/* Date and time */}
            <div className="mb-4 text-sm text-gray-500">
              <span>
                <>
                  <Link href={`/${post.username}/status/${post.id}`}>
                    <a>
                      <span className={styles.datePosted}>
                        {post.time} · {post.date.toString()}
                      </span>
                    </a>
                  </Link>
                </>
              </span>
            </div>

            {/* Post statistics */}
            {(post.reposts && post.reposts?.length > 0) ||
            (post.likes && post.likes?.length > 0) ? (
              <div className="border-t py-4 text-sm text-gray-500">
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
            ) : null}

            <div className="border-t border-b pb-4">
              <PostActions
                post={post}
                liked={liked}
                setLiked={setLiked}
                likes={likes}
                setLikes={setLikes}
                showStats={false}
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
