import { Typography } from "@material-tailwind/react";

// import utils
import { useState, useEffect } from "react";

export default function Status({ start, end }) {
  const [status, setStatus] = useState(() => {
    if (Date.now() < start) {
      return "menunggu";
    } else if (Date.now() > end) {
      return "selesai";
    } else if (Date.now() > start) {
      return "berjalan";
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() < start) {
        setStatus("menunggu");
      } else if (Date.now() > end) {
        setStatus("selesai");
      } else if (Date.now() > start) {
        setStatus("berjalan");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [start, end]);

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
