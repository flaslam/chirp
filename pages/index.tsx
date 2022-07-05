import type { NextPage } from "next";
import Head from "next/head";
import Main from "../components/Main";
import SidebarLeft from "../components/SidebarLeft";
import SidebarRight from "../components/SidebarRight";
import styles from "../styles/Home.module.css";
import { UserContext } from "../components/UserContext";
import { useContext, useEffect, useMemo, useState } from "react";

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
