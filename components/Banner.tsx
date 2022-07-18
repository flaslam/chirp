import styles from "../styles/Banner.module.css";
import AutoAwesomeIconOutlined from "@mui/icons-material/AutoAwesomeOutlined";

const Banner = () => {
  return (
    <div>
      <div className={`${styles.bannerContainer} my-4`}>
        <div className={styles.bannerHeader}>
          <h3 className="text-lg font-bold">Latest Chirps</h3>
        </div>
        <div className={styles.iconContainer}>
          <AutoAwesomeIconOutlined />
        </div>
      </div>
    </div>
  );
};

export default Banner;
