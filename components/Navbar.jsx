import Image from "next/image";

// import material-components
import { Button } from "@material-tailwind/react";

export default function Navbar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 mx-auto max-w-[1440px] bg-white">
      <div className="container flex h-24 items-center justify-between">
        <div className="inline-flex items-center gap-2">
          <Image src="/assets/icon.svg" alt="icon" width={36} height={36} />
          <span className="text-[22px] font-extrabold text-gray-900">
            Ponic<span className="text-pink-500">.</span>
          </span>
        </div>

        <div className="inline-flex items-center gap-4">
          {/* <span className="font-semibold text-gray-900">Fajar Fadillah A</span> */}
          <Button
            size="lg"
            color="pink"
            className="h-[48px] w-[120px] text-base capitalize text-white"
          >
            Masuk
          </Button>
        </div>
      </div>
    </nav>
  );
}
