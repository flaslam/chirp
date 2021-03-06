import axios from "axios";
import { Chirp } from "../types";
import { populateData } from "../utils";

const DB_HOST = String(process.env.NEXT_PUBLIC_DB_HOST);

export const getAllPosts = async (token: string = "") => {
  let headers = {
    Authorization: token,
  };

  let res;
  if (token) {
    // With headers we get posts of users we're following only
    res = await axios.get(DB_HOST, { headers });
  } else {
    // With no headers we get all posts
    res = await axios.get(DB_HOST);
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

export const createPost = async (
  token: string,
  message: string,
  parent: string = ""
) => {
  const config = {
    headers: { Authorization: token },
  };

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
  return await axios.get(`${DB_HOST}/${username}`);
};

export const getUserPosts = async (username: string) => {
  const res = await axios.get(`${DB_HOST}/${username}/status`);

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

  const res = await axios.patch(`${DB_HOST}/${userToFollow}/follow`, body);
  return res;
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
  // const body = {
  //   name: formData.get("name"),
  //   location: formData.get("location"),
  //   bio: formData.get("bio"),
  //   website: formData.get("website"),
  //   birthDate: formData.get("birthDate"),
  //   username: username,
  // };

  // console.log(formData.get("photo"));

  const config = {
    headers: {
      Authorization: token,
      "Content-Type": "multipart/form-data",
    },
  };

  // const res = await axios.patch(`${DB_HOST}/${username}`, body, config);
  // return res;

  return await axios.patch(`${DB_HOST}/${username}`, formData, config);
};
