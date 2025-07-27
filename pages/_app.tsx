import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Loader from "@/components/ui/Loader";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  const [navHeight, setNavHeight] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  // Loader for full page load
  useEffect(() => {
    const handleLoad = () => setIsLoading(false);

    if (document.readyState === "complete") {
      setIsLoading(false);
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  // Loader for page transitions
  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <>
      {isLoading && <Loader />}
      <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="preconnect" href="https://www.google.com" />
        <link rel="preconnect" href="https://maps.googleapis.com" />
      </Head>

      <Navbar onHeightChange={setNavHeight} />
      <main
        style={{
          paddingTop: navHeight,
          flex: 1,
          opacity: isLoading ? 0.4 : 1,
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}
