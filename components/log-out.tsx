import { useRouter } from "next/router";
import { useContext } from "react";
import { BlueLargeButton } from "./styled/buttons";
import { UserContext } from "./user-context";

interface LogOutProps {
  children?: JSX.Element;
}

export const LogOut: React.FC<LogOutProps> = (props) => {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");

    // TODO: redirect to homepage.
    router.push("/");
  };

  return <div onClick={handleLogout}>{props.children}</div>;
};

export default LogOut;

//<BlueLargeButton onClick={handleLogout}>Log Out</BlueLargeButton>
