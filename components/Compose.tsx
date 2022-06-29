import { PostAddSharp } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { styled } from "@mui/system";
import Image from "next/image";
import {
  ChangeEvent,
  FormEvent,
  RefObject,
  useContext,
  useRef,
  useState,
} from "react";
import styles from "../styles/Compose.module.css";
import { createPost, getPost } from "./ApiCalls";
import { UserContext } from "./UserContext";
import { Chirp } from "../types";
import { text } from "node:stream/consumers";

const styledTextField = styled(
  TextField,
  {}
)({
  color: "#f9kodk",
  backgroundColor: "silver",
  margin: "auto",
});

interface ComposeProps {
  setPosts: (posts: Chirp[]) => void;
  posts: Chirp[];
}

const Compose: React.FC<ComposeProps> = ({ posts, setPosts }) => {
  const { user } = useContext(UserContext);
  const [inputText, setInputText] = useState("");
  const textRef: RefObject<HTMLInputElement> = useRef(null);
  const handleForm = async (event: FormEvent) => {
    event.preventDefault();

    // TODO: loading time between post and display
    // disable input

    await submitData();
    setInputText("");
    // textRef = "";
    console.log(textRef.current!.value);
    textRef.current!.value = "";
    // console.log(event.target);
  };

  const submitData = async () => {
    const res = await createPost(user, inputText);
    console.log(res);
    const post = res.data.post;

    const newPost: Chirp = {
      id: post.id,
      displayName: post.user.displayName,
      username: post.user.username,
      photo: post.user.photo,
      date: post.dateFormatted,
      message: post.message,
    };

    setPosts([newPost, ...posts]);
    return;
  };

  const handleChange = (event: ChangeEvent) => {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    setInputText(input.value);
  };

  return (
    <div className={styles.composeContainer}>
      <div className={styles.photoContainer}>
        <Image
          src={"/av.jpg"}
          alt="pp"
          layout="fill"
          objectFit="contain"
          className={styles.photo}
        />
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={handleForm}>
          <TextField
            inputRef={textRef}
            onChange={handleChange}
            placeholder="What's happening?"
          />
          <Button type="submit">Post Chirp</Button>
        </form>
      </div>
    </div>
  );
};

export default Compose;
