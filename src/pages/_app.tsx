import "@/styles/style.scss";
import type { AppProps } from "next/app";
import Header from "./components/_Header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}
