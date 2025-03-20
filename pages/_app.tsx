import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { logPageView } from "../lib/tracking"; // ✅ Import our tracking system

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    console.log("✅ Tracking Initialized");

    const handleRouteChange = (url: string) => {
      console.log("📡 Tracking page view for:", url);
      logPageView(url, document.referrer); // ✅ Log page views
    };

    // ✅ Listen for page changes
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return <Component {...pageProps} />;
}
