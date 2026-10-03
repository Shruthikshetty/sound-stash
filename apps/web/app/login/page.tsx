"use client";

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
    <div>
      <GoogleLogin
        onSuccess={handleLogin}
        onError={() => {
          //@TODO this will me changed to show toast once global toast is set up
          console.error("Login Failed");
        }}
      />
    </div>
  );
}

export default LoginScreen;
