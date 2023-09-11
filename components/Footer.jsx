import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
import { IconButton, Typography } from "@material-tailwind/react";

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <footer className="mx-auto mt-8 max-w-[1440px]">
      <div className="container flex flex-col items-center gap-4 border-t-2 border-gray-200 py-8 text-center dark:border-blue-gray-800 md:flex-row md:justify-between md:text-left">
        <Typography
          variant="paragraph"
          color="blue-gray"
          className="font-semibold dark:text-white"
        >
          &copy; Hak cipta {new Date().getFullYear()} Ponic. - Di kembangkan
          oleh <span className="font-extrabold text-pink-500">Fglabs.</span> ❤️
        </Typography>

        <div className="inline-flex items-center gap-2">
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="font-semibold dark:text-white"
          >
            Mode gelap
          </Typography>

          <IconButton
            size="sm"
            variant="outlined"
            className="text-[1rem] dark:text-white"
            onClick={() =>
              theme == "dark" ? setTheme("light") : setTheme("dark")
            }
          >
            {theme == "light" ? <HiOutlineMoon /> : <HiOutlineSun />}
          </IconButton>
        </div>
      </div>
    </footer>
  );
}
