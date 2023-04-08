import { useAppStore } from "@/store/store";
import "@/styles/style.scss";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../components/Header/Header";

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: any;
}>) {
  const router = useRouter();
  const { closeMobileMenu } = useAppStore((state) => state);
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

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
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
    </SessionContextProvider>
  );
}
