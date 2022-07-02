import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getPost } from "../../../components/ApiCalls";
import { Chirp } from "../../../types";
import Post from "../../../components/Post";
import Reply from "../../../components/Reply";
import PostMain from "../../../components/PostMain";
import Back from "../../../components/Back";

const SinglePost: React.FC = () => {
  const router = useRouter();
  const username = router.query.username;
  const postId = router.query.postId;

  const [post, setPost] = useState<Chirp | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getPost(postId as string, username as string);
      setPost(res);
    };

    if (!router.isReady) return;
    fetchData();
  }, [router.isReady]);

  return (
    <div>
      <Back />
      {!post ? null : (
        <div>
          <div>
            {post.parent ? (
              <>
                {/* parent: we got one */}
                {/* {console.log(post.parent)} */}
                <Post post={post.parent} />
                Replying to ^
              </>
            ) : null}
          </div>
          <PostMain post={post} />
          <div>
            <Reply originalPost={router.query.postId as string} />
          </div>
          <div>
            {post.replies ? (
              <>
                {post.replies.map((reply) => {
                  return (
                    <>
                      <Post key={reply.id} post={reply} />
                      {/* {console.log(reply)} */}
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
