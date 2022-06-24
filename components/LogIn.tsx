import { Button, TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import { loginUser } from "./ApiCalls";
import styles from "../styles/LogIn.module.css";

const LogIn = () => {
  const [formInputData, setFormInputData] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });

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

    // Send form data to server
    submitData(formData);
  };

  // Handle sending data and the resolving the outcome
  const submitData = async (data: FormData) => {
    const res = await loginUser(data);
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

    if (fileExtension[1] !== ("jpg" || "png")) {
      console.log("No file of supported format provided.");
      return false;
    }

    return true;
  };

  return (
    <div className={styles.logInContainer}>
      <div>
        <h1>Log In</h1>
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
          <Button type="submit">Log In</Button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
