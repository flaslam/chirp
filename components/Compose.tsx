import { Button, TextField } from "@mui/material";
import { styled } from "@mui/system";
import Image from "next/image";
import { FormEvent } from "react";
import styles from "../styles/Compose.module.css";
import { createPost } from "./ApiCalls";

const styledTextField = styled(
  TextField,
  {}
)({
  color: "#f9kodk",
  backgroundColor: "silver",
  margin: "auto",
});

const handleForm = (event: FormEvent) => {
  event.preventDefault();
  console.log("ok");
};

const Compose = () => {
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
          <TextField placeholder="What's happening?" />
          <Button type="submit">Post Chirp</Button>
        </form>
      </div>
    </div>
  );
};

export default Compose;
