"use client";

import AppLogo from "@/components/app-logo";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { appClient } from "@/lib/api-client";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

function LoginScreen() {
  // function to handle the login @TODO this will be modified to use tanstack query
  const handleLogin = async (credentialResponse: CredentialResponse) => {
    await appClient.auth
      .$post({
        json: {
          token: credentialResponse?.credential ?? "",
        },
      })
      .then(async (response) => {
        // will be used later
        const _data = await response.json();
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-background p-4">
      {/* Ambient glowing aura */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 rounded-full bg-primary/20 blur-[130px]" />
      {/* header with logo   */}
      <AppLogo />
      <div className="relative h-full w-full grid grid-cols-1 md:grid-cols-2 py-5">
        <div></div>
        {/* login card */}
        <div className="w-full h-full flex justify-center align-middle">
          <Card className="max-w-[60%] min-w-100 z-1">
            <CardHeader>
              <AppLogo showName={false} ghost />
              <h1 className="text-primary text-base font-medium">
                A better kind of listening
              </h1>
              <h2 className="text-2xl font-bold">Come on in.</h2>
              <p className="text-muted-foreground">
                Sign in once and your playlists, liked songs, and daily mixes
                are right where you left them.
              </p>
            </CardHeader>
            <CardContent>
              <GoogleLogin
                onSuccess={handleLogin}
                onError={() => {
                  //@TODO this will me changed to show toast once global toast is set up
                  console.error("Login Failed");
                }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
