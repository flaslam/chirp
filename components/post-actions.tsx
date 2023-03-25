import { useContext } from "react";
import { UserContext } from "./user-context";
import { likePost } from "../lib/api-calls";
import { Chirp, User } from "../lib/types";

import {
  HiRefresh as RepostIcon,
  HiOutlineUpload as ShareIcon,
} from "react-icons/hi";
import {
  HiOutlineChatBubbleLeft as ReplyIcon,
  HiHeart as LikedIcon,
  HiOutlineHeart as LikeIcon,
} from "react-icons/hi2";

interface PostActionsProps {
  post: Chirp;
  liked: boolean;
  setLiked: (likedStatus: boolean) => void;
  likes: Chirp["likes"];
  setLikes: React.Dispatch<React.SetStateAction<Chirp["likes"]>>;
  showStats?: boolean;
}

const PostActions: React.FC<PostActionsProps> = ({
  post,
  liked,
  setLiked,
  likes,
  setLikes,
  showStats,
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
    const res = await likePost(
      user.username,
      post.id,
      post.user.username,
      !liked
    );

    if (likes && user) {
      if (!liked) {
        setLikes((prevState: any) => {
          if (prevState) {
            // TODO: deal differently iff its an object vs string
            // const newState = [...prevState, user._id];
            const newState = [...prevState, user];
            return newState;
          }
        });
      } else {
        // Array filter to remove our user id
        setLikes((prevState: any) => {
          if (Array.isArray(prevState)) {
            if (typeof prevState[0] === "string") {
              return prevState.filter((item: any) => item !== user._id);
            } else if (typeof prevState[0] === "object") {
              return prevState.filter((item: User) => item._id !== user._id);
            }
          } else {
            return [];
          }
        });
      }
    }

    // Set liked
    setLiked(!liked);
  };

  const handleShare = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    copyText();
  };

  const copyText = () => {
    const url = `${document.location.origin}/${post.user.username}/status/${post.id}`;
    navigator.clipboard.writeText(url);
    alert("The link to this post has been copied to the clipboard.");
  };

  const handleRepost = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (!user) {
      noUserWarning();
      return;
    }

    alert("Repost functionality to be added.");
  };

  return (
    <div className="flex justify-between text-xl text-gray-500 [&>*]:flex [&>*]:cursor-pointer [&>*]:items-center [&>*]:gap-1 [&>*]:transition">
      <div className="hover:text-brand">
        <ReplyIcon />
        {showStats && (
          <div className="w-6 text-center text-sm">
            {post.replies && post.replies.length > 0 && post.replies.length}
          </div>
        )}
      </div>

      <div className="hover:text-brand-green" onClick={handleRepost}>
        <RepostIcon />
        {showStats && (
          <div className="w-6 text-center text-sm">
            {post.reposts && post.reposts.length > 0 && post.reposts.length}
          </div>
        )}
      </div>

      <div className="hover:text-brand-red" onClick={handleLike}>
        {liked ? <LikedIcon className="text-brand-red" /> : <LikeIcon />}
        {showStats && (
          <div className="w-6 text-center text-sm">
            {likes && likes.length > 0 && likes.length}
          </div>
        )}
      </div>

      <div className="hover:text-brand" onClick={handleShare}>
        <ShareIcon />
      </div>
    </div>
  );
};

PostActions.defaultProps = {
  showStats: false,
};

export default PostActions;
