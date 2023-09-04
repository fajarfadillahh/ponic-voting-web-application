import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// import material-components
import { Button, Typography } from "@material-tailwind/react";

export default function Navbar() {
  const [isClient, setIsClient] = useState(false);
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

        <div className="inline-flex items-center gap-4">
          <span className="font-semibold text-gray-900">
            {fullname ? fullname : null}
          </span>

          {!token ? (
            <Button
              size="lg"
              color="pink"
              className="w-[120px] text-base capitalize"
              onClick={() => router.push("/auth/login")}
            >
              Masuk
            </Button>
          ) : (
            <Button
              size="lg"
              color="pink"
              className="w-[120px] text-base capitalize"
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
      </div>
    </nav>
  );
}
