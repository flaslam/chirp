import styles from "../styles/SidebarRight.module.css";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

const SidebarRight = () => {
  return (
    <div className={styles.sidebarRightContainer}>
      <SignUp />
      <LogIn />
    </div>
  );
};

export default SidebarRight;
