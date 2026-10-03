"use client";

import { appClient } from "@/lib/api-client";
import { GoogleLogin } from "@react-oauth/google";

function LoginScreen() {
  return (
    <div>
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          await appClient.auth
            .$post({
              json: {
                token: credentialResponse?.credential ?? "",
              },
            })
            .then(async (response) => {
              const data = await response.json();
              console.log("success", data);
            })
            .catch((error) => {
              console.log("error", error);
            });
        }}
        onError={() => {
          console.error("Login Failed");
        }}
      />
    </div>
  );
}

export default LoginScreen;
