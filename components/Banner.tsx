import styles from "../styles/Banner.module.css";
import AutoAwesomeIconOutlined from "@mui/icons-material/AutoAwesomeOutlined";

const Banner = () => {
  return (
    <div>
      <div className={styles.bannerContainer}>
        <div className={styles.bannerHeader}>
          <h2>Latest Chirps</h2>
        </div>
        <div className={styles.iconContainer}>
          <AutoAwesomeIconOutlined />
        </div>
      </div>
    </div>
  );
};

export default Banner;
