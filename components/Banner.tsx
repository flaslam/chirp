import styles from "../styles/Banner.module.css";
import AutoAwesomeIconOutlined from "@mui/icons-material/AutoAwesomeOutlined";

const Banner = () => {
  return (
    <div className="sticky top-0 z-50 rounded bg-white bg-white bg-opacity-80 py-0.5 backdrop-blur-lg">
      <div className={`${styles.bannerContainer} my-4`}>
        <div className={styles.bannerHeader}>
          <h3 className="text-lg font-bold">Latest Posts</h3>
        </div>
        <div className={styles.iconContainer}>
          <AutoAwesomeIconOutlined />
        </div>
      </div>
    </div>
  );
};

export default Banner;
