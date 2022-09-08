import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { UserContext } from "../components/user-context";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState(null);

  // Load and verify user from localStorage on component mount
  useEffect(() => {
    const checkTokenValidity = (expires: string, iat: number): boolean => {
      // TODO: remove the token if it's past expiry

      // TODO: Check for other values other than 1d
      let timeLimit = 86400000;

      if (expires === "1d") {
        // 1 day in ms
        timeLimit = 86400000;
      }

      if (Date.now() - iat < timeLimit) {
        return true;
      }

      return false;
    };

    // Check if we have user data in local storage
    const userData = localStorage.getItem("user");

    if (!userData) return;

    // Parse our user string to an object
    const userObj = JSON.parse(userData);

    if (!checkTokenValidity(userObj.expires, userObj.iat)) {
      // Use logout function which is stored in one place for this
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

  return (
    <UserContext.Provider value={value}>
      <Layout>
        <Component {...pageProps} key={router.asPath} />
      </Layout>
    </UserContext.Provider>
  );
}

export default MyApp;
