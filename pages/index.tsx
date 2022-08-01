import type { NextPage } from "next";
import Main from "../components/main";
import { UserContext } from "../components/user-context";
import { useContext } from "react";

interface HomeProps {}

const Home: NextPage<HomeProps> = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <Main user={user} />
    </div>
  );
};

export default Home;
