import type { NextPage } from "next";
import Head from "next/head";
import Main from "../components/Main";
import SidebarLeft from "../components/SidebarLeft";
import SidebarRight from "../components/SidebarRight";
import styles from "../styles/Home.module.css";
import { UserContext } from "../components/UserContext";
import { useEffect, useMemo, useState } from "react";

interface HomeProps {}

const Home: NextPage<HomeProps> = () => {
  return (
    <div>
      <Main />
    </div>
  );
};

export default Home;
