"use client";

import { COOKIE_NAMES } from "@/constants/config.constants";
import { useAuthStore } from "@/state-management/authStore";
import Cookies from "js-cookie";
import { useLayoutEffect } from "react";

//@TODO this might not me needed here at all
/**
 * This component provides the authentication context to the app
 * check if the user token is present in the cookie
 * if present set the is logged in to true
 */
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);

  // check if the token is present in the cookie
  useLayoutEffect(() => {
    const token = Cookies.get(COOKIE_NAMES.authToken);
    if (token) {
      // set is logged in to true
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

  return <>{children}</>;
};

export default AuthProvider;
