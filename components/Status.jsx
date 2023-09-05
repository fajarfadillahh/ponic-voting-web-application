import { Typography } from "@material-tailwind/react";

export default function Status({ start, end }) {
  let baseStyle =
    "inline-flex rounded-md px-3 py-0.5 text-[12px] font-bold uppercase";

  if (Date.now() > end) {
    return (
      <Typography
        variant="small"
        className={`${baseStyle} bg-green-100 text-green-600`}
      >
        Selesai
      </Typography>
    );
  } else if (Date.now() > start) {
    return (
      <Typography
        variant="small"
        className={`${baseStyle} bg-orange-100 text-orange-600`}
      >
        Berjalan
      </Typography>
    );
  } else if (Date.now() < start) {
    return (
      <Typography
        variant="small"
        className={`${baseStyle} bg-gray-200 text-gray-600`}
      >
        Menunggu
      </Typography>
    );
  }
}
