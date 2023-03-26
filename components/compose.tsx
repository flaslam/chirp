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
import { createPost, getPost } from "../lib/api-calls";
import { UserContext } from "./user-context";
import { Chirp } from "../lib/types";
import { StandardButton } from "./styled/button-styles";
import { checkValidFile } from "../lib/verify-upload";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";

interface ComposeProps {
  originalPost?: string;
  addPost?: (post: Chirp) => void;
  setOpenDialog?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Compose: React.FC<ComposeProps> = ({
  originalPost,
  addPost,
  setOpenDialog,
}) => {
  const charLimit = 140;

  const { user } = useContext(UserContext);
  const [inputText, setInputText] = useState("");
  const textRef: RefObject<HTMLInputElement> = useRef(null);

  const inputPhotoFile = useRef<HTMLInputElement | null>(null);

  const [media, setMedia] = useState<File | null>(null);

  const [mediaLocalPath, setMediaLocalPath] = useState<string>("");

  const router = useRouter();

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();
    // TODO: loading time between post and display, disable input in jsx by checking state disabled={state}
    await submitData();

    // TODO: Composed from outside of timeline - redirect?
    if (setOpenDialog) {
      setOpenDialog(false);
    }

    // Clear input text
    setInputText("");
    textRef.current!.value = "";

    // Clear input photo
    handleClearMedia();
  };

  const submitData = async () => {
    if (!user) return;

    const formData = new FormData();

    // If parentId is sent as an empty string, post won't have parent
    let parentId = "";
    originalPost ? (parentId = originalPost as string) : "";

    if (media) formData.append("media", media);
    formData.append("message", inputText);
    formData.append("parent", parentId);

    const res = await createPost(user.token, formData);
    const post = res.data.post;

    const newPost = await getPost(post.id, post.user.username);

    if (addPost) {
      await addPost(newPost);
      return;
    }

    // Redirect to the post since we have modal open
    router.push(`/${newPost.user.username}/status/${newPost.id}`);

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

    setMediaLocalPath(URL.createObjectURL(selectedFile));
  };

  const handleClearMedia = () => {
    setMedia(null);
    setMediaLocalPath("");
  };

  return (
    <>
      {user && (
        <div className="flex gap-3 border-b p-4">
          {/* Profile picture */}
          <div className="relative flex aspect-square h-12">
            <Image
              src={`${process.env.NEXT_PUBLIC_FILE_STORAGE_URL}/${user.photo}`}
              alt="pp"
              fill
              className="rounded-full"
            />
          </div>

          {/* Form */}
          <div className="grow">
            <form onSubmit={handleForm}>
              <div>
                <TextField
                  inputRef={textRef}
                  onChange={handleChangeMessage}
                  placeholder={
                    !originalPost ? "What's happening?" : "Post a reply"
                  }
                  variant="standard"
                  className="w-full"
                  required
                  multiline
                  inputProps={{ maxLength: charLimit }}
                  sx={{ size: 20 }}
                  InputProps={{
                    disableUnderline: true,
                    style: { fontSize: 20 },
                  }}
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
                    alt={media?.name || "Media"}
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

                {/* Text input progress/limit bar */}
                <div className="flex items-center px-1">
                  <CircularProgress
                    variant="determinate"
                    value={(inputText.length / charLimit) * 100}
                    size={30}
                  />
                </div>

                <StandardButton disabled={inputText.length <= 0}>
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
