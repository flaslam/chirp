import { TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import { createUser } from "./ApiCalls";
import styles from "../styles/SignUp.module.css";
import { BlueLargeButton } from "./Styled/Buttons";
import { checkValidFileExtension, checkValidFileSize } from "../verifyUpload";
import CloseIcon from "@mui/icons-material/Close";

interface SignUpProps {
  setOpenSignUpDialog(status: boolean): void;
}

const SignUp: React.FC<SignUpProps> = ({ setOpenSignUpDialog }) => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [formInputData, setFormInputData] = useState<{
    username: string;
    password: string;
    displayName: string;
  }>({
    username: "",
    password: "",
    displayName: "",
  });

  const onFileChange = (event: ChangeEvent) => {
    const input = event.target as HTMLInputElement;
    const file = input!.files?.[0];
    setSelectedFile(file);
  };

  const handleChange = (event: ChangeEvent) => {
    const input: HTMLInputElement = event.target as HTMLInputElement;

    // console.log(input.id + input.value);
    setFormInputData({ ...formInputData, [input.id]: input.value });
  };

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();

    // Create form data
    const formData = new FormData();

    // Loop through our form input data and append each to formData
    for (let key in formInputData) {
      formData.append(key, formInputData[key as keyof typeof formInputData]);
    }

    if (selectedFile) {
      const fileToUpload = selectedFile;
      if (!checkValidFileExtension(fileToUpload)) return;
      if (!checkValidFileSize(fileToUpload)) return;
      // Add our photo file to the form data
      formData.append("photo", fileToUpload);
    }

    // Send form data to server
    submitData(formData);
  };

  // Handle sending data and the resolving the outcome
  const submitData = async (data: FormData) => {
    try {
      await createUser(data);
    } catch (error) {
      alert(
        `User "${formInputData.username}" already exists. Try a different username.`
      );
      return;
    }

    // TODO: auto log-in user
    alert("User created successfully! Please sign in.");
    setOpenSignUpDialog(false);
  };

  return (
    <div className={styles.signUpContainer}>
      <div>
        <div className="pb-4">
          <div className="flex flex-row items-center">
            <div className="grow px-2 font-bold text-xl">Sign Up</div>
            <div
              className="cursor-pointer m-auto rounded-full hover:bg-gray-200 p-1"
              onClick={() => setOpenSignUpDialog(false)}
            >
              <CloseIcon className="" />
            </div>
          </div>
        </div>
        <form onSubmit={handleForm}>
          <div className="flex flex-col gap-4">
            <TextField
              id="username"
              required
              label="Username"
              onChange={handleChange}
            />
            <TextField
              id="password"
              required
              label="Password"
              onChange={handleChange}
            />
            <TextField
              id="displayName"
              required
              label="Display Name"
              onChange={handleChange}
            />
            <label>Upload profile photo:</label>
            <input type="file" onChange={onFileChange} />
            <BlueLargeButton type="submit">Sign Up</BlueLargeButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
