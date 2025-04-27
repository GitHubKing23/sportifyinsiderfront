import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ✅ Import modules and context
import GoogleAnalytics from "@modules/GoogleAnalytics";
import { AuthProvider } from "@context/AuthContext";
import { logPageView } from "@lib/tracking";
import TipWidget from "@components/TipWidget";
import Navbar from "@modules/navbar/components/Navbar";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000,
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

  console.log("🛠️ Rendering Component:", Component?.name || typeof Component);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GoogleAnalytics />
        <Navbar />
        <Component {...pageProps} />
        <TipWidget />
      </AuthProvider>
    </QueryClientProvider>
  );
}
