import { Button, TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { loginUser } from "./ApiCalls";
import styles from "../styles/LogIn.module.css";
import { UserContext } from "./UserContext";

const LogIn = () => {
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
    const res = await loginUser(data);
    // TODO: Error handling on above function not set up- never returns to this script

    console.log(res.data);

    if (!res.data.success) {
      // ERROR
    }

    // TODO: calculate expiry time on storing user
    // const token = res.data.token;
    const userData = res.data.user;
    userData.token = res.data.token;
    userData.expires = res.data.expires;
    userData.iat = res.data.iat;

    console.log(userData);
    // localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);

    // Redirect to homepage
  };

  return (
    <div className={styles.logInContainer}>
      <div>
        <div>
          {!user ? (
            <>Currently not logged in</>
          ) : (
            <>Logged in as {user.displayName}!</>
          )}
        </div>
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
          <Button
            onClick={() => {
              console.log(user);
            }}
          >
            check user
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
