import AutoAwesomeIconOutlined from "@mui/icons-material/AutoAwesomeOutlined";

const Banner = () => {
  return (
    <div className="sticky top-0 z-50 rounded bg-white bg-white bg-opacity-80 py-0.5 backdrop-blur-lg">
      <div className="my-4 flex items-center px-4">
        <div className="grow">
          <h3 className="text-lg font-bold">Latest Posts</h3>
        </div>
        <div>
          <AutoAwesomeIconOutlined />
        </div>
      </div>
    </div>
  );
};

export default Banner;
