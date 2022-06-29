import { Button, TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import { createUser } from "./ApiCalls";
import styles from "../styles/SignUp.module.css";

const SignUp = () => {
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

    if (!selectedFile) {
      console.log("No file selected.");
      return;
    }

    const fileToUpload = selectedFile;
    if (!checkValidFileExtension(fileToUpload)) return;

    // Size limitations
    const filesizeLimit = 1024 * 1024 * 1; // 1MB
    if (fileToUpload.size > filesizeLimit) {
      console.log(
        `File size is too big. Must be under ${filesizeLimit} bytes.`
      );
      return;
    }

    // Create form data
    const formData = new FormData();

    // Loop through our form input data and append each to formData
    for (let key in formInputData) {
      formData.append(key, formInputData[key as keyof typeof formInputData]);
    }

    // Add our photo file to the form data
    formData.append("photo", fileToUpload);

    // Send form data to server
    submitData(formData);
  };

  // Handle sending data and the resolving the outcome
  const submitData = async (data: FormData) => {
    const res = await createUser(data);
    if (res.data.success) {
      console.log("Successfully created user!");
      console.log(res);

      // TODO: redirect to homepage and log user in.
    } else {
      console.log("Failed to create user.");

      // TODO: Show prompt on screen telling user that something went wrong
      prompt("Something went wrong.");
    }
  };

  const checkValidFileExtension = (file: File): boolean => {
    // Check file extension using regex
    var re = /(?:\.([^.]+))?$/;
    const fileExtension = re.exec(file.name);

    if (fileExtension === null) {
      console.log("File has no file extension.");
      return false;
    }

    if (fileExtension.length < 1) {
      console.log("Failed to determine the file extension.");
      return false;
    }

    if (fileExtension[1] !== ("jpg" && "png")) {
      console.log(
        "No file of supported format provided. Received " + fileExtension[1]
      );
      return false;
    }

    return true;
  };

  return (
    <div className={styles.signUpContainer}>
      <div>
        <h1>Sign up</h1>
        <form onSubmit={handleForm}>
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
          <Button type="submit">Sign Up</Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
