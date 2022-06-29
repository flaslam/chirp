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
    // TODO: Error handling on above function not set up

    console.log(res.data);

    if (res.data.success) {
      // Redirect to homepage
    }

    // TODO: calculate the time it expires in on storing it, so we can
    // determine when to set it to localstorage as expires

    // Never returns to this script

    const token = res.data.token;

    // console.log(res.data.token);
    setUser(token);

    // TODO: set local storage!!!
    // TODO: change this to be stored as Token
    localStorage.setItem("token", token);
  };

  return (
    <div className={styles.logInContainer}>
      <div>
        <div>
          {user === "" ? <>Currently not logged in</> : <>Logged in!</>}
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
        </form>
      </div>
    </div>
  );
};

export default LogIn;
