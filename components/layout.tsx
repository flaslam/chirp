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
        <meta name="description" content="Full stack social media MERN app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col">
        {/* flex-col sm:flex-row for mobile view */}

        <div className="flex min-h-screen flex-row justify-center">
          {/* <MobileBanner /> */}
          <SidebarLeft />
          <main className="w-full border md:w-timeline">{children}</main>
          <SidebarRight />
        </div>
      </div>
    </>
  );
};

export default Layout;
