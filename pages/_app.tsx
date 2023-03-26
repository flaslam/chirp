import "../styles/globals.css";
import type { AppProps } from "next/app";
import IndexLayout from "../layouts";
import { UserContext } from "../components/user-context";
import { ReactElement, ReactNode, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [user, setUser] = useState(null);

  // Load and verify user from localStorage on component mount
  useEffect(() => {
    const checkTokenValidity = (expires: string, iat: number): boolean => {
      let timeLimit = 86400000; // 1d
      if (Date.now() - iat < timeLimit) return true;
      return false;
    };

    // Check if we have user data in local storage
    const userData = localStorage.getItem("user");

    if (!userData) return;

    // Parse our user string to an object
    const userObj = JSON.parse(userData);

    if (!checkTokenValidity(userObj.expires, userObj.iat)) {
      // TODO: Use logout function which is stored in one place for this
      localStorage.removeItem("user");
      setUser(null);
      return;
    }

    setUser(userObj);
  }, []);

  // Router key in app component allows paths to work when using router query
  const router = useRouter();

  // Prevent provider value from changing unless value actually changes
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <UserContext.Provider value={value}>
      <main className={roboto.className}>
        <IndexLayout>
          {getLayout(<Component {...pageProps} key={router.asPath} />)}
        </IndexLayout>
      </main>
    </UserContext.Provider>
  );
}

export default MyApp;
