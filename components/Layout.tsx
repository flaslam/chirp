import type { NextPage } from "next";
import Head from "next/head";
import SidebarLeft from "./SidebarLeft";
import SidebarRight from "./SidebarRight";
import styles from "../styles/Home.module.css";

interface Props {
  children: any;
}

const Layout: NextPage<Props> = ({ children }) => {
  let title = children.type.name + " | Chirp";
  if (children.type.name === "Home") {
    title = "Chirp";
  } else {
  }

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <SidebarLeft />
        <main>{children}</main>
        <SidebarRight />
      </div>
    </div>
  );
};

export default Layout;
