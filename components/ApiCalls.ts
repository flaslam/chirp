import axios from "axios";
import { Chirp, User } from "../types";

const DB_HOST = String(process.env.NEXT_PUBLIC_DB_HOST);

const populateData = (postData: any): Chirp => {
  // console.log(postData);
  const newPost: Chirp = postToChirp(postData);

  // Cycle through parent, replies, reposts, likes
  if (postData.parent) {
    // Check if it's an object (data has been populated)
    if (typeof postData.parent === "object") {
      newPost.parent = postToChirp(postData.parent);
    }
  }

  if (postData.replies) {
    if (postData.replies.length > 0) {
      newPost.replies = [];
      for (let reply of postData.replies) {
        newPost.replies.push(postToChirp(reply));
      }
    }
  }

  if (postData.reposts) {
    if (postData.reposts.length > 0) {
      newPost.reposts = [];
      for (let repost of postData.reposts) {
        newPost.reposts.push(postToChirp(repost));
      }
    }
  }

  if (postData.likes) {
    if (postData.likes.length > 0) {
      newPost.likes = [];
      for (let like of postData.likes) {
        newPost.likes.push(postToChirp(like));
      }
    }
  }

  // Catch any errors

  return newPost;
};

// TODO: API call function should not be handling organising data
const postToChirp = (post: any): Chirp => {
  // console.log(post);
  // if (!post.user) post.user = "undefined";
  const newPost: Chirp = {
    id: post.id,
    displayName: post.user.displayName,
    username: post.user.username,
    photo: post.user.photo,
    date: post.dateFormatted,
    message: post.message,
  };

  // console.log(post);
  // console.log(post.parent);
  // if (post.parent) newPost.parent = post.parent;
  // if (post.replies) newPost.replies = post.replies;
  // if (post.reposts) newPost.reposts = post.reposts;
  // if (post.likes) newPost.likes = post.likes;
  // console.log(postDataToChirp(post.parent));

  // if (post.parent) {
  //   console.log("parent is: " + post.parent);
  //   // newPost.parent = postDataToChirp(post.parent);
  // }

  // if (post.parent) {
  //   const parentData = post.parent;
  //   post.parent = null;
  //   // console.log(parentData.user.displayName);
  //   // const newParentData = postDataToChirp(parentData);
  //   // console.log(parentData.user.displayName);
  //   // console.log(newParentData);
  // }

  // TODO: expand check to see if data has been populated first
  // if (post.replies) {
  //   if (post.replies.length > 0) {
  //     newPost.replies = [];
  //     for (let reply of post.replies) {
  //       if (reply.displayName) {
  //         newPost.replies.push(postToChirp(reply));
  //       }
  //     }
  //   }
  // }

  // if (post.reposts.length > 0) {
  //   if (post.reposts) {
  //     newPost.reposts = [];
  //     for (let repost in post.reposts) {
  //       newPost.reposts.push(postDataToChirp(repost));
  //     }
  //   }
  // }

  // TODO: Likes need to format user data
  // if (post.likes) newPost.likes = post.likes;

  return newPost;
};

export const getAllPosts = async (token: string = "") => {
  const headers = {
    Authorization: "Bearer " + token,
  };
  const res = await axios.get(DB_HOST, { headers });

  let retrievedPosts: Chirp[] = [];
  for (let post of res.data) {
    // retrievedPosts.push(postToChirp(post));
    retrievedPosts.push(populateData(post));
  }

  return retrievedPosts;
};

export const getPost = async (post: string, user: string) => {
  const res = await axios.get(`${DB_HOST}/${user}/status/${post}`);
  const postData = await res.data.post;
  // const retrievedPost: Chirp = postToChirp(postData);

  const retrievedPost: Chirp = populateData(postData);
  // console.log(retrievedPost);

  // console.log(retrievedPost);
  // if (retrievedPost.parent) {
  //   retrievedPost.parent = postDataToChirp(retrievedPost.parent);
  // }

  // const parentData = res.data.post.parent;
  // if (parentData) {
  //   //   if (typeof parentData === "object") {
  //   const newParent = postToChirp(parentData);
  //   // console.log(postDataToChirp(parentData));
  //   retrievedPost.parent = newParent;
  //   //     // retrievedPost.parent = newParent;
  //   //   }
  // }

  return retrievedPost;
};

export const uploadFile = async (formData: FormData) => {
  axios.post(`${DB_HOST}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const createPost = async (
  token: string,
  message: string,
  parent: string = ""
) => {
  const config = {
    headers: { Authorization: token },
  };
  // console.log(parent);
  const body = {
    message: message,
    parent: parent,
  };
  const res = await axios.post(`${DB_HOST}`, body, config);
  return await res;
};

export const createUser = async (formData: FormData) => {
  const res = await axios.post(`${DB_HOST}/signup`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });
  return await res;
};

export const loginUser = async (formData: FormData) => {
  const res = await axios.post(`${DB_HOST}/login`, {
    username: formData.get("username"),
    password: formData.get("password"),
  });
  return await res;
};

export const getUser = async (username: string) => {
  // return await axios.get(`${DB_HOST}/${username}`);
  // return await fetch(`${DB_HOST}/${username}`);
  const res = await fetch(`${DB_HOST}/${username}`);
  const data = await res.json();
  return data;
};

export const getUserPosts = async (username: string) => {
  // return await axios.get(`${DB_HOST}/${username}`);
  // return await fetch(`${DB_HOST}/${username}`);

  const res = await fetch(`${DB_HOST}/${username}/status`);
  const data = await res.json();
  // console.log(data);

  let retrievedPosts: Chirp[] = [];
  for (let post of data) {
    retrievedPosts.push(postToChirp(post));
  }

  return retrievedPosts;
};
