import { useTheme } from "next-themes";
import { IconButton, Typography } from "@material-tailwind/react";

export default function Footer() {
  const { theme, setTheme } = useTheme();

  return (
    <footer className="mx-auto max-w-[1440px] dark:bg-gray-950">
      <div className="container flex flex-col items-center gap-4 border-t-2 border-gray-200 py-8 text-center dark:border-gray-900 md:flex-row md:justify-between md:text-left">
        <Typography
          variant="paragraph"
          color="blue-gray"
          className="font-semibold dark:text-white"
        >
          &copy; Ponic. {new Date().getFullYear()} - Develop by{" "}
          <span className="font-extrabold text-pink-500">FGlabs.</span> ❤️
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
            className="bg-gray-100 text-[1rem] shadow-none hover:bg-gray-200 hover:shadow-none dark:bg-gray-900 dark:hover:bg-gray-800"
            onClick={() =>
              theme == "dark" ? setTheme("light") : setTheme("dark")
            }
          >
            {theme == "light" ? "🌙" : "☀️"}
          </IconButton>
        </div>
      </div>
    </footer>
  );
}
