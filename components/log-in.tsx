import { TextField } from "@mui/material";
import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { loginUser } from "./api-calls";
import { UserContext } from "./user-context";
import { BlueLargeButton } from "./Styled/Buttons";
import CloseIcon from "@mui/icons-material/Close";

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
    <div className="flex flex-col p-4">
      <div>
        <div className="pb-4">
          <div className="flex flex-row items-center">
            <div className="grow px-2 text-xl font-bold">Log In</div>
            <div
              className="m-auto cursor-pointer rounded-full p-1 hover:bg-gray-200"
              onClick={() => setOpenLogInDialog(false)}
            >
              <CloseIcon className="" />
            </div>
          </div>
        </div>

        <form onSubmit={handleForm} className="flex flex-col gap-2">
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

            <BlueLargeButton type="submit">Log In</BlueLargeButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
