import { useAppStore } from "@/store/store";
import "@/styles/style.scss";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Header from "../components/Header/Header";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { closeMobileMenu } = useAppStore((state) => state);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      closeMobileMenu();
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
    };
  }, [router, closeMobileMenu]);

  return (
    <>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}
