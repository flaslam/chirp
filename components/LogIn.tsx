import { TextField } from "@mui/material";
import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { loginUser } from "./ApiCalls";
import styles from "../styles/LogIn.module.css";
import { UserContext } from "./UserContext";
import { BlueLargeButton } from "./Styled/Buttons";

interface LoginProps {
  setOpenLogInDialog(status: boolean): void;
}

const LogIn: React.FC<LoginProps> = ({ setOpenLogInDialog }) => {
  const { user, setUser } = useContext(UserContext);

  const [formInputData, setFormInputData] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });

  // Updates our formInputData as we type into our input fields
  const handleChange = (event: ChangeEvent) => {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    setFormInputData({ ...formInputData, [input.id]: input.value });
  };

  // On form submit we prepare data to send
  const handleForm = async (event: FormEvent) => {
    event.preventDefault();

    // Create form data
    const formData = new FormData();

    // Loop through formInputData and append each to formData
    for (let key in formInputData) {
      formData.append(key, formInputData[key as keyof typeof formInputData]);
    }

    // Send form data to server
    submitData(formData);
  };

  // Handle sending data and the resolving the outcome of login attempt
  const submitData = async (data: FormData) => {
    let res;

    try {
      res = await loginUser(data);
    } catch (error) {
      alert("Username or password incorrect.");
      return;
    }

    // TODO: calculate expiry time on storing user
    const userData = res.data.user;
    userData.token = res.data.token;
    userData.expires = res.data.expires;
    userData.iat = res.data.iat;
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);

    // Close dialog popup
    setOpenLogInDialog(false);
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

          <BlueLargeButton type="submit">Log In</BlueLargeButton>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
