import { Chirp, User } from "./types";

// // Handle incoming data and transforms it to a Chirp object
// export const postToChirp = (post: any): Chirp => {
//   // const newPost: Chirp = {
//   //   id: post.id,
//   //   displayName: post.user.displayName,
//   //   username: post.user.username,
//   //   photo: post.user.photo,
//   //   date: post.dateFormatted,
//   //   dateRaw: post.date,
//   //   dateRelative: post.dateRelative,
//   //   message: post.message,
//   //   replies: post.replies,
//   //   likes: post.likes,
//   //   reposts: post.reposts,
//   //   media: post.media,
//   //   time: post.time,
//   // };

//   const newPost: Chirp = {
//     id: post.id,
//     user: post.user,
//     date: post.date,
//     dateFormatted: post.dateFormatted,
//     dateRelative: post.dateRelative,
//     message: post.message,
//     replies: post.replies,
//     likes: post.likes,
//     reposts: post.reposts,
//     media: post.media,
//     time: post.time,
//   };
//   return newPost;
// };

// export const populateDataOld = (postData: any): Chirp => {
//   const newPost: Chirp = postToChirp(postData);

//   // console.log(postData);

//   // Cycle through parent, replies, reposts, likes
//   if (postData.parent && postData.parent !== undefined) {
//     newPost.parent = postToChirp(postData.parent);
//   }

//   if (postData.media && postData.media.length > 0) {
//     newPost.media = postData.media;
//   }

//   // NOTE: this fails if replies are not populated by server
//   if (postData.replies && postData.replies.length > 0) {
//     newPost.replies = [];
//     for (let reply of postData.replies) {
//       if (typeof reply !== "string" && typeof reply.user === "string") {
//         // TODO: don't populate these if it's timeline
//         newPost.replies.push(reply);
//       } else {
//         newPost.replies.push(populateData(reply));
//       }
//     }
//   }

//   if (postData.reposts && postData.reposts.length > 0) {
//     newPost.reposts = [];
//     for (let repost of postData.reposts) {
//       newPost.reposts.push(populateData(repost));
//     }
//   }

//   // TODO: Likes need to process user data rather than post data
//   // TODO: right now all user data is populated always- unnecessary
//   if (postData.likes && postData.likes.length > 0) {
//     newPost.likes = [];
//     for (let like of postData.likes) {
//       const newUser: User = like as User;
//       newPost.likes.push(like._id);

//       // NOTE: this might break checking if you are a liked user?
//       // newPost.likes.push(newUser);
//     }
//   }

//   // TODO: Catch any errors - return null for missing posts
//   return newPost;
// };

export const populateData = (postData: any): Chirp => {
  console.log(postData);
  const newPost: Chirp = postData as Chirp;

  newPost.parent = postData.parent as Chirp;
  // newPost.parent.user as User;
  newPost.replies = postData.replies as Chirp[];
  return newPost;
};
