// import material-components
import { Typography } from "@material-tailwind/react";

export default function Status({ value }) {
  let baseStyle = "inline-flex rounded-md px-3 py-0.5 text-[14px] font-bold";

  // condition value
  if (value === "Selesai") {
    baseStyle += " bg-green-100 text-green-600";
  } else if (value === "Berjalan") {
    baseStyle += " bg-orange-100 text-orange-600";
  } else if (value === "Pending") {
    baseStyle += " bg-gray-200 text-gray-600";
  }

  return (
    <Typography variant="small" className={`${baseStyle}`}>
      {value}
    </Typography>
  );
}
