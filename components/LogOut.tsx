import { Button } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "./UserContext";

const LogOut = () => {
  const { user, setUser } = useContext(UserContext);
  const handleLogout = () => {
    setUser("");
    localStorage.removeItem("user");

    // TODO: redirect to homepage.
  };
  return <Button onClick={handleLogout}>Log Out</Button>;
};

export default LogOut;
