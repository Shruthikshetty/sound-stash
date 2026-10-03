"use client";
/**
 * This component contains all the providers for the app
 */
import { GoogleOAuthProvider } from "@react-oauth/google";

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <GoogleOAuthProvider
      clientId={process.env?.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
    >
      {children}
    </GoogleOAuthProvider>
  );
};

export default AppProviders;
