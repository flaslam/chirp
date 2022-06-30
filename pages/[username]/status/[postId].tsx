import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getPost } from "../../../components/ApiCalls";
import { Chirp } from "../../../types";
import Post from "../../../components/Post";
import Reply from "../../../components/Reply";

const SinglePost: React.FC = () => {
  const router = useRouter();
  const username = router.query.username;
  const postId = router.query.postId;

  const [post, setPost] = useState<Chirp | null>(null);
  const [replies, setReplies] = useState<Chirp[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getPost(postId as string, username as string);
      // console.log(res);

      setPost(res.retrievedPost);
      setReplies(res.children);
      // if (res.children !== null |) {
      // }
      // setPost(res);
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
          <div>
            <Reply originalPost={router.query.postId as string} />
          </div>
          <div>
            {replies ? (
              <>
                {replies.map((reply) => {
                  return (
                    <>
                      <Post key={reply.id} post={reply} />
                    </>
                  );
                })}
              </>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePost;
