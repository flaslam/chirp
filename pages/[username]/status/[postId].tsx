import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getPost } from "../../../components/ApiCalls";
import { Chirp } from "../../../types";

const SinglePost: React.FC = () => {
  const router = useRouter();
  const username = router.query.username;
  const postId = router.query.postId;

  const [post, setPost] = useState<Chirp | null>(null);
  const [replies, setReplies] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getPost(postId as string, username as string);
      setPost(res.data.post);
    };

    if (router.isReady) {
      fetchData();
    }
  }, [router.isReady]);

  return (
    <div>
      {!post ? null : (
        <div>
          <div>{post?.message}</div>
          <div>show all replies here</div>
        </div>
      )}
    </div>
  );
};

export default SinglePost;
