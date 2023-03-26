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
  const [likes, setLikes] = useState<Chirp["likes"]>(
    post?.likes ? post.likes : []
  );

  const [showPostOptions, setShowPostOptions] = useState<boolean>(false);

  // Check if liked posts contains this user
  useEffect(() => {
    if (!user) {
      setLiked(false);
      return;
    }

    // Check format of likes array
    if (!post?.likes) return;

    for (const item of post.likes) {
      if (typeof item === "string") {
        if (item == user._id) {
          setLiked(true);
        }
      } else if (typeof item === "object") {
        const thisUser = item as User;
        if (thisUser._id == user._id) {
          setLiked(true);
          return;
        }
      }
    }
  }, [post, user]);

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

    return dateToDisplay;
  };

  const parentPost = post?.parent && (
    <div className="text-slate-600">
      Replying to{" "}
      <Link href={`/${post.parent.user.username}`}>
        <span className="text-sky-600 hover:underline">
          @{post.parent.user.username}
        </span>
      </Link>
    </div>
  );

  const displayMedia = post?.media && post?.media.length > 0 && (
    <div className="relative aspect-video">
      <Image
        src={`${process.env.NEXT_PUBLIC_FILE_STORAGE_URL}/${post.media[0]}`}
        alt={post.id}
        fill
        className="rounded-xl object-cover"
      />
    </div>
  );

  const profilePicture = post && (
    <Link href={`/${post.user.username}`}>
      <div className="relative aspect-square w-12">
        <Image
          src={`${process.env.NEXT_PUBLIC_FILE_STORAGE_URL}/${post.user.photo}`}
          alt={post.user.username}
          fill
          className="z-20 rounded-full object-cover"
        />
      </div>
    </Link>
  );

  const PostTimeline = () => {
    return (
      <>
        {post && (
          <div>
            <Link href={`/${post.user.username}/status/${post.id}`}>
              <div
                className={`p-4 transition hover:cursor-pointer ${
                  showPostOptions ? null : "hover:bg-gray-100"
                }`}
              >
                <div className="flex gap-3">
                  <div className="shrink">{profilePicture}</div>

                  <div className="grow">
                    <div>
                      {/* Name row */}
                      <div className="flex">
                        <div className="flex grow gap-1">
                          <div className="truncate font-bold hover:underline">
                            <Link href={`/${post.user.username}`}>
                              {post.user.displayName}
                            </Link>
                          </div>
                          <div className="truncate text-gray-500">
                            <Link href={`/${post.user.username}`}>
                              @{post.user.username}
                            </Link>
                          </div>
                          <div className="text-gray-500">·</div>
                          <div className="text-gray-500 hover:underline">
                            <Link
                              href={`/${post.user.username}/status/${post.id}`}
                            >
                              {showRelativeOrNormalDate()}
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

                      <>{parentPost}</>

                      {/* Message */}
                      <div>{post.message}</div>

                      {/* Media */}
                      <div className="pt-2">{displayMedia}</div>
                    </div>

                    <div className="mt-3 flex">
                      <div className="grow">
                        <PostActions
                          post={post}
                          liked={liked}
                          setLiked={setLiked}
                          likes={likes}
                          setLikes={setLikes}
                          showStats={true}
                        />
                      </div>
                      <div className="max-w-[3rem] grow" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}
      </>
    );
  };

  const PostMain = () => {
    return (
      <>
        {post && (
          <div className="p-4">
            <div className="flex gap-3">
              <div className="relative flex w-12 shrink-0">
                {/* Line to link up to parent post if we have one */}
                {/* TODO: make dynamic */}
                {post.parent && (
                  <div className="absolute h-full w-full">
                    <div className="flex items-center justify-center">
                      <div className="h-96 w-0.5 -translate-y-full bg-gray-300" />
                    </div>
                  </div>
                )}

                {profilePicture}
              </div>

              <div className="grow">
                <div className="flex">
                  <div className="grow">
                    <Link href={`/${post.user.username}`}>
                      <div className="font-bold">{post.user.displayName}</div>
                      <div className="text-gray-500">@{post.user.username}</div>
                    </Link>
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

            <div className="pt-4">{parentPost}</div>

            <div className="py-4">
              {/* Message */}
              <p className="text-xl">{post.message}</p>

              {/* Media */}
              <div className="pt-2">{displayMedia}</div>
            </div>

            {/* Date and time */}
            <div className="mb-4 text-sm text-gray-500 hover:underline">
              <Link href={`/${post.user.username}/status/${post.id}`}>
                {post.time} · {post.dateFormatted}
              </Link>
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
                        {likes.length > 1 ? "Likes" : "Like"}
                      </div>
                    </Modal>
                  ) : null}
                </div>
              </div>
            ) : null}

            <div className="border-t border-b pb-4">
              <div className="mx-12 mt-3">
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
