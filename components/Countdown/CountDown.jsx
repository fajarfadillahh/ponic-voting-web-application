import Countdown from "react-countdown";

// import material-components
import { Typography } from "@material-tailwind/react";

// import components
import CountDownRenderer from "@/components/Countdown/CountDownRenderer";

export default function CountDown({ className, end, handleComplete }) {
  const renderer = ({ days, hours, minutes, seconds }) => {
    return (
      <CountDownRenderer
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  };

  return (
    <div className={`grid justify-items-center gap-1 ${className}`}>
      <Typography
        variant="h5"
        color="blue-gray"
        className="font-semibold dark:text-white"
      >
        Voting akan berakhir dalam:
      </Typography>

      <Countdown date={end} renderer={renderer} onComplete={handleComplete} />
    </div>
  );
}
