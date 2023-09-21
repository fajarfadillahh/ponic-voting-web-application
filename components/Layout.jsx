// import components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// import utils
import { useRouter } from "next/router";

export default function Layout({ children, className }) {
  const router = useRouter();
  const { pathname } = router;

  // hide components
  const hideComponentsOnPages = [
    "/auth/login",
    "/auth/register",
    "/rooms/result",
  ];

  // current page
  const hideNavbar = !hideComponentsOnPages.includes(pathname);
  const hideFooter = !hideComponentsOnPages.includes(pathname);

  return (
    <>
      {hideNavbar && <Navbar />}

      <main
        className={`mx-auto min-h-screen max-w-[1440px] overflow-hidden dark:bg-gray-950 ${className}`}
      >
        {children}
      </main>

      {hideFooter && <Footer />}
    </>
  );
}
