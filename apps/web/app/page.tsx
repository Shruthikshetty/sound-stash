"use client";

import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

/**
 * Home screen of the app
 */
export default function Home() {
  // navigate to login
  const router = useRouter();
  useLayoutEffect(() => {
    router.push("/login");
  }, [router]);
  return (
    <main>
      <h1>Sound Stash</h1>
      <p>In construction...</p>
    </main>
  );
}
