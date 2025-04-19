// pages/_app.tsx
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import GoogleAnalytics from "@modules/GoogleAnalytics";
import { AuthProvider } from "@/context/AuthContext";

import { logPageView } from "../lib/tracking";

// Initialize QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2, // Retry failed queries twice
      staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    console.log("✅ Tracking Initialized");

    const handleRouteChange = (url: string) => {
      console.log("📡 Tracking page view for:", url);
      logPageView(url, document.referrer);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GoogleAnalytics />
        <Component {...pageProps} />
      </AuthProvider>
    </QueryClientProvider>
  );
}