import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";

import GoogleAnalytics from "@modules/GoogleAnalytics"; // ✅ Moved to correct position
import { logPageView } from "../lib/tracking"; // ✅ Tracking system

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    console.log("✅ Tracking Initialized");

    const handleRouteChange = (url: string) => {
      console.log("📡 Tracking page view for:", url);
      logPageView(url, document.referrer); // ✅ Log page views
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <GoogleAnalytics />
      <Component {...pageProps} />
    </>
  );
}
