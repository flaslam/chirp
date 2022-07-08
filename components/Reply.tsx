import { TextField } from "@mui/material";
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
import { createPost } from "./ApiCalls";
import { UserContext } from "./UserContext";
import { Chirp } from "../types";
import { postToChirp } from "../utils";
import { StandardButton } from "./Styled/Buttons";

interface ReplyProps {
  originalPost: string;
  addReply: (newReply: Chirp) => void;
}

const Reply: React.FC<ReplyProps> = ({ originalPost, addReply }) => {
  const { user } = useContext(UserContext);
  const [inputText, setInputText] = useState("");
  const textRef: RefObject<HTMLInputElement> = useRef(null);

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();
    // TODO: loading time between post and display, disable input in jsx by checking state disabled={state}
    await submitData();

    // Clear input text
    setInputText("");
    textRef.current!.value = "";
  };

  const submitData = async () => {
    if (!user) return;
    const parentId = originalPost as string;
    const res = await createPost(user.token, inputText, parentId);
    const post = res.data.post;

    const newPost = postToChirp(post);

    addReply(newPost);
    return;
  };

  const handleChange = (event: ChangeEvent) => {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    setInputText(input.value);
  };

  return (
    <>
      {!user ? null : (
        <div className={styles.composeContainer}>
          <div className={styles.photoContainer}>
            <Image
              src={`${process.env.NEXT_PUBLIC_DB_HOST}/${user.photo}`}
              alt="pp"
              layout="fill"
              className={styles.photo}
            />
          </div>
          <div className={styles.formContainer}>
            <form onSubmit={handleForm}>
              <div>
                <TextField
                  inputRef={textRef}
                  onChange={handleChange}
                  placeholder="Post a reply"
                  // style={{ width: "100%" }}
                  className={styles.textField}
                  required
                />
              </div>
              <div className={styles.buttonHolder}>
                <StandardButton type="submit">Reply</StandardButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Reply;
