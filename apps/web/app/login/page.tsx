"use client";

import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

function LoginScreen() {
  return (
    <div>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
          //backend api call just temp for testing
          axios
            .post("http://localhost:8787/auth", {
              token: credentialResponse.credential,
            })
            .then((response) => {
              console.log("success", JSON.stringify(response));
            })
            .catch((error) => {
              console.log("error", JSON.stringify(error, null, 2));
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
