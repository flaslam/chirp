import { TextField } from "@mui/material";
import Image from "next/image";
import {
  ChangeEvent,
  FormEvent,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "../styles/Compose.module.css";
import { createPost } from "./ApiCalls";
import { UserContext } from "./UserContext";
import { Chirp, ComposeType } from "../types";
import { postToChirp } from "../utils";
import { StandardButton } from "./Styled/Buttons";

interface ComposeProps {
  addPost: (post: Chirp) => void;
}

const Compose: React.FC<ComposeProps> = ({ addPost }) => {
  const [postDisabled, setPostDisabled] = useState<boolean>(true);

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
    const res = await createPost(user.token, inputText);
    const post = res.data.post;
    const newPost = postToChirp(post);

    addPost(newPost);
    return;
  };

  const handleChange = (event: ChangeEvent) => {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    setInputText(input.value);
  };

  useEffect(() => {
    //
    if (inputText.length > 0) {
      setPostDisabled(false);
      return;
    }

    setPostDisabled(true);
  }, [inputText]);

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
                  placeholder="What's happening?"
                  variant="standard"
                  // style={{ width: "100%" }}
                  className={styles.textField}
                  required
                  multiline
                  inputProps={{ maxLength: 140 }}
                />
              </div>
              <div className={styles.buttonHolder}>
                <StandardButton disabled={postDisabled}>Post</StandardButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Compose;
