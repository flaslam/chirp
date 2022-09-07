import { useRouter } from "next/router";
import UserPage from "../components/user-page";

const UserPagePath: React.FC = () => {
  const router = useRouter();
  const path = router.asPath;
  return <UserPage params={path} />;
};

export default UserPagePath;
