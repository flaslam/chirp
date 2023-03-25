import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "./user-context";

interface LogOutProps {
  children?: JSX.Element;
}

export const LogOut: React.FC<LogOutProps> = (props) => {
  const { setUser } = useContext(UserContext);
  const router = useRouter();
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/"); // redirect to homepage.
  };

  return <div onClick={handleLogout}>{props.children}</div>;
};

export default LogOut;
