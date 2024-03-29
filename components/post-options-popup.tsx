import Link from "next/link";
import { useRouter } from "next/router";
import { Chirp } from "../lib/types";
import { deletePost } from "../lib/api-calls";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useRef } from "react";
import useClickOutside from "../hooks/use-click-outside";

interface DetailsPopupProps {
  showPostOptions: boolean;
  setShowPostOptions: React.Dispatch<React.SetStateAction<boolean>>;
  post: Chirp;
  user: any;
}

const PostOptionsPopup: React.FC<DetailsPopupProps> = ({
  showPostOptions,
  setShowPostOptions,
  post,
  user,
}) => {
  const router = useRouter();

  const optionsRef = useRef(null);
  useClickOutside(optionsRef, () => setShowPostOptions(false));

  const handleMore = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    setShowPostOptions((prevState) => !prevState);
  };

  const handleDelete = async (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    setShowPostOptions(false);

    if (post?.id && post?.user.username && user) {
      try {
        await deletePost(post?.user.username, post?.id, user.token);
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

  const handleLink = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault;
    setShowPostOptions(false);
    console.log("work");
  };

  return (
    <div ref={optionsRef}>
      <div
        className={`${
          showPostOptions ? "absolute" : "hidden"
        } z-30 flex w-60 -translate-x-full flex-col overflow-hidden rounded-md bg-white drop-shadow-lg [&>*]:p-2`}
      >
        {post?.user.username === user?.username ? (
          <div className="truncate hover:bg-gray-300" onClick={handleDelete}>
            Delete post
          </div>
        ) : (
          <div className="truncate hover:bg-gray-300" onClick={handleLink}>
            <Link href={`/${post?.user.username}`}>
              Go to @{post?.user.username}&#39;s profile
            </Link>
          </div>
        )}
        <div className="truncate hover:bg-gray-300" onClick={handleLink}>
          <Link href={`/${post?.user.username}/status/${post?.id}`}>
            {/* Share/copy URL */}
            Go to post page
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
  );
};

export default PostOptionsPopup;
