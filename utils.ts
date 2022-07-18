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

  // TODO: this is firing off for a lot of undefined posts
  // console.log(postData);

  // Cycle through parent, replies, reposts, likes
  if (postData.parent && postData.parent !== undefined) {
    try {
      // Check if it's an object (data has been populated)
      if (typeof postData.parent === "object") {
        // TODO: this is returning the reply that we're currently on the page for twice when it's a reply
        // newPost.parent = populateData(postData.parent);
        newPost.parent = postToChirp(postData.parent);
      } else {
        newPost.parent = postToChirp(postData.parent);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // NOTE: this fails if replies are not populated by server
  if (postData.replies && postData.replies.length > 0) {
    newPost.replies = [];
    for (let reply of postData.replies) {
      // if (typeof reply !== "string") {
      // }
      newPost.replies.push(populateData(reply));
    }
  }

  if (postData.reposts && postData.reposts.length > 0) {
    newPost.reposts = [];
    for (let repost of postData.reposts) {
      newPost.reposts.push(populateData(repost));
    }
  }

  // TODO: Likes need to process user data rather than post data
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

// import { Chirp } from "./types";

// // Handle incoming data and transforms it to a Chirp object
// export const postToChirp = (post: any): Chirp => {
//   const newPost: Chirp = {
//     id: post.id,
//     displayName: post.user.displayName,
//     username: post.user.username,
//     photo: post.user.photo,
//     date: post.dateFormatted,
//     message: post.message,
//   };

//   return newPost;
// };

// export const populateData = (postData: any): Chirp => {
//   const newPost: Chirp = postToChirp(postData);

//   // Cycle through parent, replies, reposts, likes
//   if (postData.parent) {
//     // Check if it's an object (data has been populated)
//     if (typeof postData.parent === "object") {
//       newPost.parent = postToChirp(postData.parent);
//     }
//   }

//   if (postData.replies && postData.replies.length > 0) {
//     newPost.replies = [];
//     for (let reply of postData.replies) {
//       newPost.replies.push(postToChirp(reply));
//     }
//   }

//   if (postData.reposts && postData.reposts.length > 0) {
//     newPost.reposts = [];
//     for (let repost of postData.reposts) {
//       newPost.reposts.push(postToChirp(repost));
//     }
//   }

//   // TODO: Likes needs to process user data rather than post data
//   // TODO: right now all user data is populated always- unnecessary
//   if (postData.likes && postData.likes.length > 0) {
//     newPost.likes = [];
//     for (let like of postData.likes) {
//       newPost.likes.push(like._id);
//     }
//   }

//   // TODO: Catch any errors - return null for missing posts
//   return newPost;
// };
