import Post from "./Post";
import styles from "../styles/Timeline.module.css";
import { Chirp } from "../types";
import { useEffect, useState } from "react";
import { getAllPosts } from "./ApiCalls";

interface TimelineProps {
  posts: Chirp[];
}

const Timeline: React.FC<TimelineProps> = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => {
        return <Post key={post.id} post={post} />;
      })}
    </div>
  );
};

export default Timeline;
