import type { NextPage } from "next";
import Head from "next/head";
import SidebarLeft from "./sidebar-left";
import SidebarRight from "./sidebar-right";
import MobileBanner from "./mobile-banner";
import { useState } from "react";

interface LayoutProps {
  children: any;
}

const Layout: NextPage<LayoutProps> = ({ children }) => {
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

        <div className="flex min-h-screen flex-row justify-center">
          {/* <MobileBanner /> */}
          <SidebarLeft />
          <main className="max-w-timeline w-full md:w-timeline">
            {children}
          </main>
          <SidebarRight />
        </div>
      </div>
    </>
  );
};

export default Layout;
