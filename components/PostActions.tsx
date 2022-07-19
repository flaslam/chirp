import styles from "../styles/Post.module.css";
import { Chirp } from "../types";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import IosShareIcon from "@mui/icons-material/IosShare";
import React, { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { likePost } from "./ApiCalls";

interface PostActionsProps {
  post: Chirp;
  liked: boolean;
  setLiked: (likedStatus: boolean) => void;
  likes: Chirp["likes"];
  setLikes: React.Dispatch<React.SetStateAction<Chirp["likes"]>>;
}

const PostActions: React.FC<PostActionsProps> = ({
  post,
  liked,
  setLiked,
  likes,
  setLikes,
}) => {
  const { user } = useContext(UserContext);

  const handleLike = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (!user) return;
    sendLikeRequest();
  };

  const sendLikeRequest = async () => {
    // Send a bool of liked to determine whether we're liking or unliking
    const res = await likePost(user.username, post.id, post.username, !liked);
    console.log(res);

    // TODO: set post like count increase properly
    if (likes && user) {
      console.log(likes);

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

        console.log("ADD like!!");
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

    // TODO: dropdown menu

    if (!user) return;
  };

  const showStats: boolean = true;

  return (
    <div className={styles.postActions}>
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
      <div className={styles.repostsIconHolder}>
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

      <div className={styles.sharesIconHolder}>
        <IosShareIcon className={styles.sharesIcon} />
      </div>
    </div>
  );
};

export default PostActions;
