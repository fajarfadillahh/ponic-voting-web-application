import { zeroPad } from "react-countdown";

// import material-components
import { Typography } from "@material-tailwind/react";

export default function CountDownItem({ label, value }) {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center">
        <Typography
          color="blue-gray"
          className="-mb-2 text-[32px] font-extrabold dark:text-white sm:-mb-4 sm:text-[48px]"
        >
          {zeroPad(value, 2)}
        </Typography>
        <Typography
          variant="paragraph"
          color="blue-gray"
          className="font-semibold dark:text-white"
        >
          {label}
        </Typography>
      </div>

      {label !== "Detik" && (
        <span className="mx-4 text-[32px] font-medium text-gray-900 dark:text-white">
          :
        </span>
      )}
    </div>
  );
}
