import { CircularProgress, TextField } from "@mui/material";
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
import { createPost, getPost } from "./ApiCalls";
import { UserContext } from "./UserContext";
import { Chirp } from "../types";
import { postToChirp } from "../utils";
import { StandardButton } from "./Styled/Buttons";
import { checkValidFile } from "../verifyUpload";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import CloseIcon from "@mui/icons-material/Close";

interface ComposeProps {
  originalPost?: string;
  addPost: (post: Chirp) => void;
}

const Compose: React.FC<ComposeProps> = ({ originalPost, addPost }) => {
  const MAX_CHAR_LIMIT = 140;

  const [postDisabled, setPostDisabled] = useState<boolean>(true);

  const { user } = useContext(UserContext);
  const [inputText, setInputText] = useState("");
  const textRef: RefObject<HTMLInputElement> = useRef(null);

  const inputPhotoFile = useRef<HTMLInputElement | null>(null);

  const [media, setMedia] = useState<File | null>(null);

  const [mediaLocalPath, setMediaLocalPath] = useState<string>("");

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();
    // TODO: loading time between post and display, disable input in jsx by checking state disabled={state}
    await submitData();

    // Clear input text
    setInputText("");
    textRef.current!.value = "";

    // Clear input photo
    handleClearMedia();
  };

  const submitData = async () => {
    if (!user) return;

    const formData = new FormData();

    if (media) formData.append("media", media);

    // If parentId is sent as an empty string, post won't have parent
    let parentId = "";
    originalPost ? (parentId = originalPost as string) : "";

    formData.append("message", inputText);

    formData.append("parentId", parentId);

    // const res = await createPost(user.token, inputText, parentId);
    const res = await createPost(user.token, formData);
    const post = res.data.post;
    // const newPost = postToChirp(post);
    // newPost.media = [mediaLocalPath];

    // addPost(newPost);

    const newPost = await getPost(post.id, post.user.username);

    await addPost(newPost);
    return;
  };

  const handleChangeMessage = (event: ChangeEvent) => {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    setInputText(input.value);
  };

  const handleSelectMedia = () => {
    // Simulate click on our invisible input file
    inputPhotoFile.current?.click();
  };

  const handleChangeMedia = () => {
    const selectedFile = inputPhotoFile.current?.files?.[0];

    console.log(inputPhotoFile.current);

    if (!selectedFile) {
      alert("Could not process this photo file.");
      return;
    }

    if (!checkValidFile(selectedFile)) {
      alert("Could not process this photo file.");
      return;
    }

    // TODO: need visual feedback on success or failure

    // TODO: need to now change the visible photo
    setMedia(selectedFile);

    // setMediaLocalPath(selectedFile.)

    // selectedFile.
    setMediaLocalPath(URL.createObjectURL(selectedFile));

    // alert("Filed successfully selected. Save to upload file.");
  };

  const handleClearMedia = () => {
    setMedia(null);
    setMediaLocalPath("");
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
          {/* Profile picture */}
          <div className={styles.photoContainer}>
            <Image
              src={`${process.env.NEXT_PUBLIC_DB_HOST}/${user.photo}`}
              alt="pp"
              layout="fill"
              className={styles.photo}
            />
          </div>

          {/* Form */}
          <div className={styles.formContainer}>
            <form onSubmit={handleForm}>
              <div>
                <TextField
                  inputRef={textRef}
                  onChange={handleChangeMessage}
                  placeholder={
                    !originalPost ? "What's happening?" : "Post a reply"
                  }
                  variant="standard"
                  // style={{ width: "100%" }}
                  className={styles.textField}
                  required
                  multiline
                  inputProps={{ maxLength: MAX_CHAR_LIMIT }}
                  sx={{ size: 20 }}
                  InputProps={{
                    disableUnderline: true,
                    style: { fontSize: 20 },
                  }}
                  // size="medium"
                />
              </div>

              {/* Display media we're uploading */}
              {!media && !mediaLocalPath ? null : (
                <div className="my-2">
                  <div
                    className="absolute z-10 m-2 rounded-full bg-gray-900 p-1 transition hover:cursor-pointer hover:bg-gray-700"
                    onClick={handleClearMedia}
                  >
                    <CloseIcon className="text-white" />
                  </div>
                  <Image
                    src={mediaLocalPath}
                    alt={media?.name}
                    width="16"
                    height="9"
                    objectFit="cover"
                    layout="responsive"
                    className="rounded-lg"
                  />
                </div>
              )}

              {/* Bottom row */}
              <div className="flex items-center justify-start">
                {/* File upload */}
                <div className="flex h-full w-full items-center justify-start">
                  <div
                    onClick={handleSelectMedia}
                    className="m-1 rounded-full p-1 transition hover:cursor-pointer hover:bg-sky-100"
                  >
                    <ImageOutlinedIcon className="p-0.5 text-sky-600" />
                  </div>
                </div>

                <input
                  type="file"
                  id="file"
                  ref={inputPhotoFile}
                  style={{ display: "none" }}
                  onChange={handleChangeMedia}
                />

                {/* Text input limit bar */}
                <div className="flex items-center px-1">
                  <CircularProgress
                    variant="determinate"
                    value={(inputText.length / MAX_CHAR_LIMIT) * 100}
                    size={30}
                  />
                </div>

                <StandardButton disabled={postDisabled}>
                  {!originalPost ? "Post" : "Reply"}
                </StandardButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Compose;
