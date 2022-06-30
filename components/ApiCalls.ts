import axios from "axios";
import { Chirp } from "../types";

const DB_HOST = String(process.env.NEXT_PUBLIC_DB_HOST);

// TODO: API call function should not be handling organising data
const postDataToChirp = (post: any) => {
  const newPost: Chirp = {
    id: post.id,
    displayName: post.user.displayName,
    username: post.user.username,
    photo: post.user.photo,
    date: post.dateFormatted,
    message: post.message,
  };

  // if (post.replies) newPost.replies = post.replies;
  // if (post.reposts) newPost.reposts = post.reposts;
  // if (post.likes) newPost.likes = post.likes;

  // // TODO: expand check to see if data has been populated first
  // if (post.replies.displayName) {
  //   if (post.replies) {
  //     newPost.replies = [];
  //     for (let reply of post.replies) {
  //       newPost.replies.push(postDataToChirp(reply));
  //     }
  //   }
  // }

  // if (post.reposts.displayName) {
  //   if (post.reposts) {
  //     newPost.reposts = [];
  //     for (let repost in post.reposts) {
  //       newPost.reposts.push(postDataToChirp(repost));
  //     }
  //   }
  // }

  // // TODO: Likes need to format user data
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
    retrievedPosts.push(postDataToChirp(post));
    // retrievedPosts = [...retrievedPosts, newPost];
  }

  return retrievedPosts;
};

export const getPost = async (post: string, user: string) => {
  // TODO: these replies aren't populated
  const res = await axios.get(`${DB_HOST}/${user}/status/${post}`);
  const postData = res.data.post;
  // let retrievedPosts: Chirp[] = [];
  // for (let post of data) {
  //   retrievedPosts.push(postDataToChirp(post));
  // }

  const childrenData = res.data.children;

  const retrievedPost: Chirp = postDataToChirp(postData);
  const children: Chirp[] = [];
  for (let child of childrenData) {
    children.push(postDataToChirp(child));
  }
  return { retrievedPost, children };
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
  console.log(parent);
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

  let retrievedPosts: Chirp[] = [];
  for (let post of data) {
    retrievedPosts.push(postDataToChirp(post));
  }
  return retrievedPosts;
};
