import axios from "axios";
import { Chirp } from "../types";

const DB_HOST = String(process.env.NEXT_PUBLIC_DB_HOST);

export const getAllPosts = async (token: string = "") => {
  const headers = {
    Authorization: "Bearer " + token,
  };
  const res = await axios.get(DB_HOST, { headers });

  let retrievedPosts: Chirp[] = [];
  for (let post of res.data) {
    const newPost: Chirp = {
      id: post.id,
      displayName: post.user.displayName,
      username: post.user.username,
      photo: post.user.photo,
      date: post.dateFormatted,
      message: post.message,
    };

    // retrievedPosts = [...retrievedPosts, newPost];
    retrievedPosts.push(newPost);
  }

  return retrievedPosts;
};

export const getPost = async (post: string, user: string) => {
  // const headers = {
  //   Authorization: "Bearer " + token,
  // };
  return await axios.get(`${DB_HOST}/${user}/status/${post}`);
};

export const uploadFile = async (formData: FormData) => {
  // console.log(`uploading file ${file}`);
  axios.post(`${DB_HOST}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const createPost = async (token: string, message: string) => {
  const config = {
    headers: { Authorization: token },
  };
  const body = {
    message: message,
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
