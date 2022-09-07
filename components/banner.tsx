import AutoAwesomeIconOutlined from "@mui/icons-material/AutoAwesomeOutlined";
import Back from "./back";

interface BannerProps {
  showBack?: boolean;
  headerText?: string;
  showStars?: boolean;
}

const Banner: React.FC<BannerProps> = (props) => {
  return (
    <div className="sticky top-0 z-50 flex flex grow items-center items-center bg-white bg-opacity-80 py-2 text-lg font-medium backdrop-blur-lg transition">
      {props.showBack ? <Back /> : null}
      <span className="grow px-4 py-0.5 font-bold text-black">
        {props.headerText ? props.headerText : ""}
      </span>
      {props.showStars ? (
        <div className="px-4">
          <AutoAwesomeIconOutlined />
        </div>
      ) : null}
    </div>
  );
};

Banner.defaultProps = {
  showBack: false,
  showStars: false,
};

export default Banner;
