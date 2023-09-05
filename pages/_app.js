import "@/styles/globals.css";

import NextNProgress from "nextjs-progressbar";

// import utils
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if (
      router.pathname.startsWith("/dashboard") ||
      router.pathname.startsWith("/rooms")
    ) {
      window.addEventListener("focus", () => {
        const token = Cookies.get("token");

        if (!token) {
          return (window.location.href = "/auth/login");
        }
      });
    }
  }, [router.pathname]);

  return (
    <>
      <NextNProgress color="#E43F6F" />
      <Component {...pageProps} />
    </>
  );
}
