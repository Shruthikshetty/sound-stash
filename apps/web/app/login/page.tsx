"use client";

import AppLogo from "@/components/app-logo";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { appClient } from "@/lib/api-client";
import { cn } from "@/lib/utils";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { Headphones, Music2, Sparkle } from "lucide-react";

function LoginScreen() {
  const notes = [
    {
      title: "Your taste",
      description: "No noise",
    },
    {
      title: "Your library",
      description: "All in one place",
    },
    {
      title: "Your moment",
      description: "Every day",
    },
  ];
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
    <div className="relative isolate min-h-screen overflow-hidden bg-background p-4 w-full h-full">
      {/* Ambient glowing aura */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 rounded-full bg-primary/20 blur-[130px]" />
      {/* header with logo   */}
      <AppLogo />
      <div className="relative h-full w-full grid grid-cols-1 md:grid-cols-2 py-5">
        <div className="order-2 md:order-1 space-y-3 mt-5">
          <Badge variant={"secondary"} className="bg-accent/70 text-sm px-2">
            <Sparkle size={15} color="hsl(7 100% 69%)" />
            <p className="text-foreground">Your world, in rhythm</p>
          </Badge>
          <h1 className="text-3xl text-foreground font-bold">
            Find the sound
            <br />
            <span className="text-primary">of your somewhere.</span>
          </h1>
          <p className="text-muted-foreground">
            A listening space that moves with you. Keep your favorites close,
            follow a feeling, and let the next song find its way to you.
          </p>
          <div className="flex flex-row items-center gap-2 mt-2">
            <div className="bg-primary/20 border border-primary/40 rounded-full w-7 h-7 flex items-center justify-center">
              <Headphones color="hsl(7 100% 69%)" size={15} />
            </div>
            <p className="font-medium text-xs text-muted-foreground">
              Made for the moments between everything.
            </p>
          </div>
        </div>
        {/* login card */}
        <div className="w-full h-full flex justify-center align-middle">
          <Card className="max-w-[60%] min-w-100 z-1">
            <CardHeader className="gap-3">
              <AppLogo showName={false} ghost />
              <h1 className="text-primary text-base font-medium mt-2">
                A better kind of listening
              </h1>
              <h2 className="text-3xl font-bold">Come on in.</h2>
              <p className="text-muted-foreground">
                Sign in once and your playlists, liked songs, and daily mixes
                are right where you left them.
              </p>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 mt-4">
              <GoogleLogin
                onSuccess={handleLogin}
                onError={() => {
                  //@TODO this will me changed to show toast once global toast is set up
                  console.error("Login Failed");
                }}
              />
              <p className="text-center text-xs text-muted-foreground">
                Continue to explore the Sonora listening experience.
              </p>

              {/* separator */}
              <div className="border-b border-gray-600/70 mb-2 mt-5" />
              {/* list of notes */}
              <ul className="flex flex-row justify-between items-center">
                {notes.map((item, i) => (
                  <li
                    className={cn(
                      "flex flex-col items-center border-r border-gray-600/70 flex-1",
                      i === 2 && "border-none",
                    )}
                    key={i}
                  >
                    <p className="text-sm text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
