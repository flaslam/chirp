import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";

interface BackProps {
  profileName?: string;
}

const Back: React.FC<BackProps> = (props) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="m-2 flex flex-row items-center">
      <div
        className=" rounded-full hover:bg-gray-200 p-2  transition duration-300 hover:cursor-pointer w-10 h-10"
        onClick={handleBack}
      >
        <ArrowBackIcon className="flex justify-center items-center" />
      </div>
      <div className="font-medium text-lg px-6">
        {/* {!props.profileName ? "Post" : props.profileName}  */}
        {!props.profileName ? "" : props.profileName}
      </div>
    </div>
  );
};

export default Back;
