import { Typography } from "@material-tailwind/react";

export default function Status({ status }) {
  let baseStyle =
    "inline-flex justify-center rounded-md px-2 py-0.5 text-[14px] font-bold uppercase";

  if (status == "selesai") {
    return (
      <Typography
        variant="small"
        className={`${baseStyle} bg-green-100 text-green-600 dark:bg-green-100/20`}
      >
        Selesai
      </Typography>
    );
  } else if (status == "berjalan") {
    return (
      <Typography
        variant="small"
        className={`${baseStyle} bg-orange-100 text-orange-600 dark:bg-orange-100/20`}
      >
        Berjalan
      </Typography>
    );
  } else if (status == "menunggu") {
    return (
      <Typography
        variant="small"
        className={`${baseStyle} bg-gray-200 text-gray-700 dark:bg-white/10`}
      >
        Menunggu
      </Typography>
    );
  }
}
