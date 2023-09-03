// import materail-components
import { Typography } from "@material-tailwind/react";

export default function Footer() {
  return (
    <footer className="mx-auto mt-8 max-w-[1440px]">
      <div className="container flex h-24 items-center justify-center border-t-2 border-gray-200">
        <Typography
          variant="paragraph"
          color="blue-gray"
          className="font-semibold"
        >
          Hak cipta {new Date().getFullYear()} - Di kembangkan oleh ❤️
        </Typography>
      </div>
    </footer>
  );
}
