// import components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Layout({ children, className }) {
  return (
    <>
      <Navbar />

      <main
        className={`mx-auto min-h-screen max-w-[1440px] overflow-hidden ${className}`}
      >
        {children}
      </main>

      <Footer />
    </>
  );
}
