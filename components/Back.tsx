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
    <div className="m-4 flex flex-row items-center">
      <ArrowBackIcon onClick={handleBack} style={{ cursor: "pointer" }} />
      <div className="font-medium text-lg px-8">
        {!props.profileName ? null : props.profileName}
      </div>
    </div>
  );
};

export default Back;
