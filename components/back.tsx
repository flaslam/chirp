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
    <div
      className="ml-2 h-10 w-10 rounded-full p-2 transition hover:cursor-pointer hover:bg-gray-200"
      onClick={handleBack}
    >
      <ArrowBackIcon className="flex items-center justify-center" />
    </div>
  );
};

export default Back;

// return (
//   <div className="sticky top-0 z-50 flex flex-row items-center bg-white bg-opacity-80 py-2 backdrop-blur-lg">
//     <div
//       className="ml-2 h-10 w-10 rounded-full  p-2 transition duration-300 hover:cursor-pointer hover:bg-gray-200"
//       onClick={handleBack}
//     >
//       <ArrowBackIcon className="flex items-center justify-center" />
//     </div>
//     <div className="px-6 text-lg font-medium">
//       {/* {!props.profileName ? "Post" : props.profileName}  */}
//       {!props.profileName ? "" : props.profileName}
//     </div>
//   </div>
// );
