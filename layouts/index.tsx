import type { NextPage } from "next";
import Head from "next/head";
import SidebarLeft from "../components/sidebar-left";
import SidebarRight from "../components/sidebar-right";

interface IndexLayoutProps {
  children: React.ReactNode;
}

const IndexLayout: NextPage<IndexLayoutProps> = ({ children }) => {
  const title = "Chirp";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Full stack social media app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col">
        <div className="flex min-h-screen flex-row justify-center">
          <SidebarLeft />
          <main className="w-full border-l border-r md:w-timeline">
            {children}
          </main>
          <SidebarRight />
        </div>
      </div>
    </>
  );
};

export default IndexLayout;
