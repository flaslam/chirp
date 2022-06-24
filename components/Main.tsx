import Timeline from "./Timeline";
import Compose from "./Compose";
import styles from "../styles/Main.module.css";
import Banner from "./Banner";

const Main = () => {
  return (
    <div className={styles.mainContainer}>
      <Banner />
      <Compose />
      <Timeline />
    </div>
  );
};

export default Main;
