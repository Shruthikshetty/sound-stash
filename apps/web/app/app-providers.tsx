"use client";
/**
 * This component contains all the providers for the app
 */
import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthProvider from "./auth-provider";
import { useState } from "react";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Toaster } from "sonner";
import { errorToast } from "@/lib/toast-wrapper";

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  //initialize the query client
  const [queryClient] = useState(
    () =>
      new QueryClient({
        // globally handle errors for all queries
        queryCache: new QueryCache({
          onError: (error) => {
            errorToast(error?.message ?? "Something went wrong");
          },
        }),
        // globally handle errors for all mutations
        mutationCache: new MutationCache({
          onError: (error) => {
            errorToast(error?.message, "Please try again later");
          },
        }),
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider
        clientId={process.env?.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
      >
        <Toaster position="bottom-right" />
        <AuthProvider>{children}</AuthProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
};

export default AppProviders;
