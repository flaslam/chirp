import { TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import { createUser } from "./api-calls";
import { BlueLargeButton } from "./Styled/Buttons";
import { checkValidFileExtension, checkValidFileSize } from "../verifyUpload";
import CloseIcon from "@mui/icons-material/Close";

interface SignUpProps {
  setOpenDialog(status: boolean): void;
}

const SignUp: React.FC<SignUpProps> = ({ setOpenDialog }) => {
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
    setOpenDialog(false);
  };

  return (
    <div className="flex flex-col p-4">
      <div>
        <div className="pb-4">
          <div className="flex flex-row items-center">
            <div className="grow px-2 text-xl font-bold">Sign Up</div>
            <div
              className="m-auto cursor-pointer rounded-full p-1 hover:bg-gray-200"
              onClick={() => setOpenDialog(false)}
            >
              <CloseIcon className="" />
            </div>
          </div>
        </div>
        <form onSubmit={handleForm} className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <TextField
              id="username"
              required
              label="Username"
              type="text"
              onChange={handleChange}
            />
            <TextField
              id="password"
              required
              label="Password"
              type="password"
              onChange={handleChange}
            />
            <TextField
              id="displayName"
              required
              label="Display Name"
              type="text"
              onChange={handleChange}
            />
            <label>Upload profile photo:</label>
            <input type="file" onChange={onFileChange} />
            <BlueLargeButton type="submit" className="mx-auto">
              Sign Up
            </BlueLargeButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
