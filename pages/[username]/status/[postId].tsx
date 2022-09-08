import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getPost } from "../../../components/api-calls";
import { Chirp, PostDisplayType } from "../../../lib/types";
import Post from "../../../components/post";
import Banner from "../../../components/banner";
import Compose from "../../../components/compose";
import Loading from "../../../components/loading";

const SinglePost: NextPage = () => {
  const router = useRouter();
  const username = router.query.username;
  const postId = router.query.postId;

  const [loading, setLoading] = useState<boolean>(false);

  const [post, setPost] = useState<Chirp | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPost(postId as string, username as string);
        setPost(res);
        setLoading(false);
      } catch (err) {
        // TODO: handle setting post as deleted
        alert("Could not retrieve post.");
        console.log(err);
      }
    };

    setLoading(true);
    if (!router.isReady) return;
    fetchData();
  }, [router.isReady, username, postId]);

  const addReply = (newReply: Chirp) => {
    if (!post) return;

    // Need to create new object to force re-render when changing array value
    const postToAdd: Chirp = { ...post };

    if (postToAdd) {
      // Create replies array if we don't have any yet
      if (!postToAdd.replies) postToAdd.replies = [];

      postToAdd.replies.push(newReply);
    }

    setPost(postToAdd);
  };

  return (
    <div>
      <Banner showBack={true} />
      {loading ? (
        <Loading />
      ) : (
        <>
          {!post ? null : (
            <div>
              <div>
                {post.parent ? (
                  <div>
                    <Post
                      post={post.parent}
                      postType={PostDisplayType.Timeline}
                    />
                    {/* <span className="m-4 ml-16">Replying to ↑</span> */}
                  </div>
                ) : null}
              </div>

              <Post post={post} postType={PostDisplayType.Main} />
              <div>
                <Compose
                  originalPost={router.query.postId as string}
                  addPost={addReply}
                />
              </div>
              <div className="divide-y">
                {post.replies ? (
                  <>
                    {post.replies.map((reply) => {
                      return (
                        <Post
                          key={reply.id}
                          post={reply}
                          postType={PostDisplayType.Timeline}
                        />
                      );
                    })}
                  </>
                ) : null}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SinglePost;
