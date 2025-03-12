import "../styles/globals.css"; // ✅ Relative path to the root "styles" folder
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
