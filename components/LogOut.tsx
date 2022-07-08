import { Button } from "@mui/material";
import { useContext } from "react";
import { BlueLargeButton } from "./Styled/Buttons";
import { UserContext } from "./UserContext";

const LogOut = () => {
  const { user, setUser } = useContext(UserContext);
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");

    // TODO: redirect to homepage.
  };
  return <BlueLargeButton onClick={handleLogout}>Log Out</BlueLargeButton>;
};

export default LogOut;
