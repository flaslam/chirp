import { Chirp, User } from "./types";

export const populateData = (postData: any): Chirp => {
  console.log(postData);
  const newPost: Chirp = postData as Chirp;

  newPost.parent = postData.parent as Chirp;
  // newPost.parent.user as User;
  newPost.replies = postData.replies as Chirp[];
  return newPost;
};
