import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import NextNProgress from "nextjs-progressbar";

// import utils
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import toast from "@/utils/toast";
import messages from "@/utils/messages";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if (
      router.pathname.startsWith("/dashboard") ||
      router.pathname.startsWith("/rooms")
    ) {
      window.addEventListener("focus", async () => {
        const token = Cookies.get("token");

        if (!token) {
          toast(messages.expired, "error");
          return (window.location.href = "/auth/login");
        }
      });
    }
  }, [router.pathname]);

  return (
    <>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <Toaster />
        <NextNProgress color="#E43F6F" />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
