import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";

const Back = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div style={{ margin: "1rem" }}>
      <ArrowBackIcon onClick={handleBack} style={{ cursor: "pointer" }} />
    </div>
  );
};

export default Back;
