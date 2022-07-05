import styles from "../styles/Post.module.css";
import { Chirp } from "../types";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import IosShareIcon from "@mui/icons-material/IosShare";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { likePost } from "./ApiCalls";

interface PostActionsProps {
  post: Chirp;
  liked: boolean;
  setLiked: (likedStatus: boolean) => void;
}

// TODO: fill in heart when post is liked

const PostActions: React.FC<PostActionsProps> = ({ post, liked, setLiked }) => {
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

    // Set liked
    setLiked(!liked);

    // TODO: set post like count increase.
  };

  const handleShare = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (!user) return;
    sendLikeRequest();
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

      {liked ? (
        <div className={styles.likesIconHolderFilled} onClick={handleLike}>
          <FavoriteIcon
            className={styles.likesIconFilled}
            style={{ fill: "red" }}
          />
          <span>
            {!showStats ? null : (
              <>
                {post.likes ? (
                  <>{post.likes.length > 0 ? <>{post.likes.length}</> : null}</>
                ) : null}
              </>
            )}
          </span>
        </div>
      ) : (
        <div className={styles.likesIconHolder} onClick={handleLike}>
          <FavoriteBorderOutlinedIcon className={styles.likesIcon} />
          <span>
            {post.likes ? (
              <>{post.likes.length > 0 ? <>{post.likes.length}</> : null}</>
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
