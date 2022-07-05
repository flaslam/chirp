import { Chirp } from "./types";

// Handle incoming data and transforms it to a Chirp object
export const postToChirp = (post: any): Chirp => {
  const newPost: Chirp = {
    id: post.id,
    displayName: post.user.displayName,
    username: post.user.username,
    photo: post.user.photo,
    date: post.dateFormatted,
    message: post.message,
  };

  return newPost;
};

export const populateData = (postData: any): Chirp => {
  const newPost: Chirp = postToChirp(postData);

  // Cycle through parent, replies, reposts, likes
  if (postData.parent) {
    // Check if it's an object (data has been populated)
    if (typeof postData.parent === "object") {
      newPost.parent = postToChirp(postData.parent);
    }
  }

  if (postData.replies && postData.replies.length > 0) {
    newPost.replies = [];
    for (let reply of postData.replies) {
      newPost.replies.push(postToChirp(reply));
    }
  }

  if (postData.reposts && postData.reposts.length > 0) {
    newPost.reposts = [];
    for (let repost of postData.reposts) {
      newPost.reposts.push(postToChirp(repost));
    }
  }

  // TODO: Likes needs to process user data rather than post data
  // TODO: right now all user data is populated always- unnecessary
  if (postData.likes && postData.likes.length > 0) {
    newPost.likes = [];
    for (let like of postData.likes) {
      newPost.likes.push(like._id);
    }
  }

  // TODO: Catch any errors - return null for missing posts
  return newPost;
};
