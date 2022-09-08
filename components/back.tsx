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
