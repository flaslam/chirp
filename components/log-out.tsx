import { useRouter } from "next/router";
import { useContext } from "react";
import { BlueLargeButton } from "./Styled/Buttons";
import { UserContext } from "./user-context";

export const LogOut = () => {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");

    // TODO: redirect to homepage.
    router.push("/");
  };

  return <BlueLargeButton onClick={handleLogout}>Log Out</BlueLargeButton>;
};

export default LogOut;
