import type { NextPage } from "next";
import Head from "next/head";
import SidebarLeft from "./SidebarLeft";
import SidebarRight from "./SidebarRight";
import styles from "../styles/Home.module.css";
import MobileBanner from "./MobileBanner";
import { useState } from "react";

interface Props {
  children: any;
}

const Layout: NextPage<Props> = ({ children }) => {
  // let title = children.type.name + " | Chirp";
  // if (children.type.name === "Home") {
  //   title = "Chirp";
  // } else {
  // }

  const [openSidebar, setOpenSidebar] = useState<boolean>(false);

  const title = "Chirp";
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col">
        {/* flex-col sm:flex-row for mobile view */}
        <div className="flex flex-row sm:justify-center min-h-screen">
          {/* <MobileBanner /> */}
          <SidebarLeft />
          <main className="w-full max-w-timeline md:w-timeline">
            {children}
          </main>
          <SidebarRight />
        </div>
      </div>
    </>
  );
};

export default Layout;
