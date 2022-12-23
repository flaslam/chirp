import styles from "../styles/Post.module.css";
import Image from "next/image";
import Link from "next/link";
import PostActions from "./post-actions";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./user-context";
import { Chirp, PostDisplayType, User } from "../lib/types";
import PostOptionsPopup from "./post-options-popup";
import { getPostLikes } from "../lib/api-calls";
import Modal from "./modal";
import UserList from "./user-list";

interface PostProps {
  post?: Chirp;
  postType: PostDisplayType;
}

// TODO: post should have its own state because we need to update like counter
const Post: React.FC<PostProps> = ({ post, postType }) => {
  const { user } = useContext(UserContext);
  const [liked, setLiked] = useState<boolean>(false);
  const [likes, setLikes] = useState<Chirp["likes"]>(post?.likes);

  const [showPostOptions, setShowPostOptions] = useState<boolean>(false);

  // On user change: check if liked posts contains this user
  useEffect(() => {
    if (!user) {
      setLiked(false);
      return;
    }

    // TODO: this works if array is of strings
    // if (post?.likes?.includes(user._id)) {
    //   setLiked(true);
    // }

    // TODO: the like increment doesn't work

    // Loop through array, if first item is a string, then do top, if first item is an object, then check if _id matches
    if (post && post.likes) {
      for (const item of post.likes) {
        if (typeof item === "string") {
          if (item == user._id) {
          }
        } else if (typeof item === "object") {
          const thisUser = item as User;
          if (thisUser._id == user._id) {
            setLiked(true);
            return;
          }
        }
      }
    }

    // Initialise to an empty array
    if (!post?.likes) setLikes([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const showRelativeOrNormalDate = () => {
    // If date is less than a day, show time posted relative to now
    let dateToDisplay = post?.dateFormatted;

    if (post?.date) {
      const timePosted = new Date(post.date).getTime();
      const currTime = new Date().getTime();
      const diff = currTime - timePosted;
      const timeInDaysSincePost = diff / (1000 * 60 * 60 * 24);

      if (timeInDaysSincePost < 1) {
        dateToDisplay = post.dateRelative;
      }
    }

    return <>{dateToDisplay}</>;
  };

  const showParent = () => {
    return !post?.parent ? null : (
      <div className="text-slate-600">
        Replying to{" "}
        <Link href={`/${post.parent.user.username}`}>
          <a className="text-sky-600 hover:underline">
            @{post.parent.user.username}
          </a>
        </Link>
      </div>
    );
  };

  const PostTimeline = () => {
    return (
      <>
        {!post ? (
          "There is no post"
        ) : (
          <Link href={`/${post.user.username}/status/${post.id}`}>
            <div
              className={`p-4 transition hover:cursor-pointer ${
                showPostOptions ? null : "hover:bg-gray-100"
              }`}
            >
              <div className={styles.post}>
                <div className={`${styles.photoContainer}`}>
                  <Link
                    href={`/${post.user.username}`}
                    style={{ position: "relative" }}
                  >
                    <a>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_FILE_STORAGE_URL}/${post.user.photo}`}
                        alt={post.user.username}
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
                        <Link href={`/${post.user.username}`}>
                          <a>{post.user.displayName}</a>
                        </Link>
                      </div>
                      <div className="truncate text-gray-500">
                        <Link href={`/${post.user.username}`}>
                          <a>@{post.user.username}</a>
                        </Link>
                      </div>
                      <div className="text-gray-500">·</div>
                      <div className="text-gray-500 hover:underline">
                        <Link href={`/${post.user.username}/status/${post.id}`}>
                          <a>{showRelativeOrNormalDate()}</a>
                        </Link>
                      </div>
                    </div>

                    <PostOptionsPopup
                      showPostOptions={showPostOptions}
                      setShowPostOptions={setShowPostOptions}
                      post={post}
                      user={user}
                    />
                  </div>

                  {showParent()}

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
                  href={`/${post.user.username}`}
                  style={{ position: "relative" }}
                >
                  <a>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_FILE_STORAGE_URL}/${post.user.photo}`}
                      alt={post.user.username}
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
                        <Link href={`/${post.user.username}`}>
                          <a>
                            <div>
                              <span className={styles.displayName}>
                                {post.user.displayName}
                              </span>
                            </div>
                            <div>
                              <span>@{post.user.username}</span>
                            </div>
                          </a>
                        </Link>
                      </>
                    </div>
                  </div>
                  <PostOptionsPopup
                    showPostOptions={showPostOptions}
                    setShowPostOptions={setShowPostOptions}
                    post={post}
                    user={user}
                  />
                </div>
              </div>
            </div>

            {/* Body */}

            <div className="pt-4">{showParent()}</div>

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
                  <Link href={`/${post.user.username}/status/${post.id}`}>
                    <a>
                      <span className={styles.datePosted}>
                        {post.time} · {post.dateFormatted}
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
                    <Modal
                      render={UserList}
                      data={likes as User[]}
                      title="Liked by"
                      fullWidth={true}
                      topRow={true}
                    >
                      <div className="hover:cursor-pointer hover:underline">
                        <span className="font-bold">{likes.length}</span>{" "}
                        {likes.length > 1 ? <>Likes</> : <>Like</>}
                      </div>
                    </Modal>
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
