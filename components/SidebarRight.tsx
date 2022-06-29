import styles from "../styles/SidebarRight.module.css";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import LogOut from "./LogOut";

const SidebarRight = () => {
  const msg = useContext(UserContext);
  return (
    <div className={styles.sidebarRightContainer}>
      <SignUp />
      <LogIn />
      <LogOut />
    </div>
  );
};

export default SidebarRight;
