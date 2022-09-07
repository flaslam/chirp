import styles from "../styles/Post.module.css";
import React, { useContext } from "react";
import { UserContext } from "./user-context";
import { likePost } from "./api-calls";
import { Chirp } from "../lib/types";

// Icons
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import IosShareIcon from "@mui/icons-material/IosShare";

interface PostActionsProps {
  post: Chirp;
  liked: boolean;
  setLiked: (likedStatus: boolean) => void;
  likes: Chirp["likes"];
  setLikes: React.Dispatch<React.SetStateAction<Chirp["likes"]>>;
  shrinkActions?: boolean;
}

const PostActions: React.FC<PostActionsProps> = ({
  post,
  liked,
  setLiked,
  likes,
  setLikes,
  shrinkActions,
}) => {
  const { user } = useContext(UserContext);

  const handleLike = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (!user) {
      noUserWarning();
      return;
    }

    sendLikeRequest();
  };

  const noUserWarning = () => {
    alert("You must be logged in to perform that action.");
  };

  const sendLikeRequest = async () => {
    // Send a bool of liked to determine whether we're liking or unliking
    const res = await likePost(user.username, post.id, post.username, !liked);
    console.log(res);

    // TODO: set post like count increase properly
    if (likes && user) {
      // console.log(likes);

      if (!liked) {
        setLikes((prevState: any) => {
          if (prevState) {
            // console.log(prevState);
            // console.log(user._id);
            const newState = [...prevState, user._id];
            // console.log(newState);
            return newState;
          }
        });

        // console.log("ADD like!!");
      } else {
        // Array filter to remove our user id
        setLikes((prevState: any) => {
          console.log(prevState);
          console.log("Removing like");
          if (Array.isArray(prevState)) {
            const newState = prevState.filter((item: any) => item !== user._id);
            console.log(newState);
            return newState;
          } else {
            return [];
          }
        });
      }
    }

    // console.log(likes);

    // Set liked
    setLiked(!liked);
  };

  const handleShare = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    copyText();
  };

  const copyText = () => {
    const url = `${document.location.origin}/${post.username}/status/${post.id}`;
    navigator.clipboard.writeText(url);
    alert("The link to this post has been copied to the clipboard.");
  };

  const handleRepost = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (!user) {
      noUserWarning();
      return;
    }
  };

  const showStats: boolean = true;

  return (
    <div
      className={`${
        styles.postActions
      } flex justify-between px-6 pt-4 md:ml-0 md:px-14 ${
        shrinkActions ? "ml-12" : null
      }`}
    >
      <div className={styles.repliesIconHolder}>
        <ChatBubbleOutlineIcon className={styles.repliesIcon} />
        <span>
          {!showStats ? null : (
            <>
              {post.replies ? (
                <>
                  {post.replies.length > 0 ? <>{post.replies.length}</> : null}
                </>
              ) : null}
            </>
          )}
        </span>
      </div>
      <div className={styles.repostsIconHolder} onClick={handleRepost}>
        <AutorenewIcon className={styles.repostsIcon} />
        <span>
          {!showStats ? null : (
            <>
              {post.reposts ? (
                <>
                  {post.reposts.length > 0 ? <>{post.reposts.length}</> : null}
                </>
              ) : null}
            </>
          )}
        </span>
      </div>

      {/* TODO: make code less repetitive */}
      {liked ? (
        <div className={styles.likesIconHolderFilled} onClick={handleLike}>
          <FavoriteIcon
            className={`${styles.likesIconFilled}`}
            style={{ fill: "red" }}
          />
          <span>
            {!showStats ? null : (
              <>
                {likes ? (
                  <>{likes.length > 0 ? <>{likes.length}</> : null}</>
                ) : null}
              </>
            )}
          </span>
        </div>
      ) : (
        <div className={styles.likesIconHolder} onClick={handleLike}>
          <FavoriteBorderOutlinedIcon className={styles.likesIcon} />
          <span>
            {likes ? (
              <>{likes.length > 0 ? <>{likes.length}</> : null}</>
            ) : null}
          </span>
        </div>
      )}

      <div className={styles.sharesIconHolder} onClick={handleShare}>
        <IosShareIcon className={styles.sharesIcon} />
      </div>
    </div>
  );
};

export default PostActions;
