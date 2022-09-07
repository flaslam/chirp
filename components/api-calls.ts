import axios from "axios";
import { Chirp } from "../lib/types";
import { populateData } from "../lib/utils";

const DB_HOST = String(process.env.NEXT_PUBLIC_DB_HOST);

export const getAllPosts = async (
  limit: number,
  skip: number,
  token: string = ""
) => {
  let headers = {
    Authorization: token,
  };

  let res;

  const url = `${DB_HOST}/?limit=${limit}&skip=${skip}`;
  if (token) {
    // With headers we get posts of users we're following only
    res = await axios.get(`${DB_HOST}/?limit=${limit}&skip=${skip}`, {
      headers,
    });
  } else {
    // With no headers we get all posts
    res = await axios.get(`${DB_HOST}/?limit=${limit}&skip=${skip}`);
  }

  let retrievedPosts: Chirp[] = [];

  for (let post of res.data) {
    retrievedPosts.push(populateData(post));
  }

  return retrievedPosts;
};

export const getPost = async (post: string, user: string) => {
  const res = await axios.get(`${DB_HOST}/${user}/status/${post}`);
  const postData = await res.data.post;
  const retrievedPost: Chirp = populateData(postData);
  return retrievedPost;
};

export const uploadFile = async (formData: FormData) => {
  axios.post(`${DB_HOST}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Send post as formdata
export const createPost = async (token: string, data: FormData) => {
  const config = {
    headers: { Authorization: token },
    "Content-Type": "multipart/form-data",
  };

  return await axios.post(`${DB_HOST}`, data, config);
};

export const createUser = async (formData: FormData) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  };

  return await axios.post(`${DB_HOST}/signup`, formData, config);
};

export const loginUser = async (formData: FormData) => {
  const res = await axios.post(`${DB_HOST}/login`, {
    username: formData.get("username"),
    password: formData.get("password"),
  });
  return await res;
};

export const getUserProfile = async (username: string) => {
  return await axios.get(`${DB_HOST}/${username}/profile`);
};

export const getUserPosts = async (
  username: string,
  endpoint: string = `/${username}`,
  limit: number,
  skip: number
) => {
  const res = await axios.get(
    `${DB_HOST}${endpoint}?skip=${skip}?limit=${limit}`
  );

  let retrievedPosts: Chirp[] = [];

  for (let post of res.data) {
    retrievedPosts.push(populateData(post));
  }

  return retrievedPosts;
};

export const getUserPostsWithReplies = async (username: string) => {
  const res = await axios.get(`${DB_HOST}/${username}/with_replies`);

  let retrievedPosts: Chirp[] = [];

  for (let post of res.data) {
    retrievedPosts.push(populateData(post));
  }

  return retrievedPosts;
};

export const followUser = async (
  username: string,
  userToFollow: string,
  follow: boolean
) => {
  const body = {
    username: username,
    follow: follow,
  };

  return await axios.patch(`${DB_HOST}/${userToFollow}/follow`, body);
};

export const likePost = async (
  username: string,
  post: string,
  author: string,
  like: boolean
) => {
  const body = {
    username: username,
    like: like,
  };

  return await axios.patch(`${DB_HOST}/${author}/status/${post}/like`, body);
};

export const updateProfile = async (
  formData: FormData,
  username: string,
  token: string
) => {
  const config = {
    headers: {
      Authorization: token,
      "Content-Type": "multipart/form-data",
    },
  };

  return await axios.patch(`${DB_HOST}/${username}`, formData, config);
};

export const deletePost = async (
  username: string,
  postId: string,
  token: string
) => {
  const config = {
    headers: {
      Authorization: token,
      "Content-Type": "multipart/form-data",
    },
  };
  return await axios.delete(`${DB_HOST}/${username}/status/${postId}`, config);
};
