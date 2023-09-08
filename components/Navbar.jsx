import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { Button, IconButton, Typography } from "@material-tailwind/react";

export default function Navbar() {
  const [isClient, setIsClient] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const router = useRouter();
  const token = Cookies.get("token");
  const fullname = Cookies.get("fullname");

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return;
  }

  return (
    <nav className="fixed inset-x-0 top-0 z-50 mx-auto max-w-[1440px] bg-white">
      <div className="container flex h-24 items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2">
          <Image src="/assets/icon.svg" alt="icon" width={36} height={36} />
          <Typography variant="h5" color="blue-gray" className="font-extrabold">
            Ponic<span className="text-pink-500">.</span>
          </Typography>
        </Link>

        <div
          className={`fixed inset-x-0 top-24 flex w-full origin-top flex-col items-center gap-4 bg-white px-6 py-8 shadow-[0_4px_8px_rgba(0,0,0,0.05)] transition sm:static sm:top-0 sm:w-auto sm:scale-y-100 sm:flex-row sm:bg-transparent sm:p-0 sm:shadow-none ${
            navbarOpen ? "scale-y-100" : "scale-y-0"
          }`}
        >
          <span className="font-semibold text-gray-900">
            {fullname ? fullname : null}
          </span>

          {!token ? (
            <Button
              size="lg"
              color="pink"
              className="w-full text-base capitalize sm:w-[120px]"
              onClick={() => router.push("/auth/login")}
            >
              Masuk
            </Button>
          ) : (
            <Button
              size="lg"
              color="pink"
              className="w-full text-base capitalize sm:w-[120px]"
              onClick={() => {
                Cookies.remove("token");
                Cookies.remove("fullname");
                return (window.location.href = "/");
              }}
            >
              Keluar
            </Button>
          )}
        </div>

        <IconButton
          size="sm"
          variant="outlined"
          color="gray"
          className="sm:hidden"
          onClick={() => setNavbarOpen(!navbarOpen)}
        >
          <HiMenuAlt2 className="text-[1.2rem]" />
        </IconButton>
      </div>
    </nav>
  );
}
