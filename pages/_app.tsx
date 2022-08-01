import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../component/layout";
import { UserContext } from "../component/user-context";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState(null);

  // TODO: the context and login functionality need to be linked
  // so we don't individually set local storage and setUser
  useEffect(() => {
    const checkTokenValidity = (expires: string, iat: number): boolean => {
      // TODO: we need to remove the token if it's past expiry
      // check EXPIRATION is on client side, SO WE NEED TO
      // check and delete session data here after checking expiry
      // time from our login data
      // TODO: implement getExpiration();
      // otherwise logout and redirect to homepage

      // TODO: Check for other values other than 1d
      let timeLimit = 2000;
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

    // console.log(user);

    // Authorise token
    // checkTokenValidity(token);
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
