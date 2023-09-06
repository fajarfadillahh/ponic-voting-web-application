// import components
import { Alert as AlertMT } from "@material-tailwind/react";
import { HiCheck, HiXCircle } from "react-icons/hi";

// import utils
import { useEffect, useState } from "react";

export default function Alert({ message, type }) {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 2500);
  }, []);

  const icon =
    type == "success" ? (
      <HiCheck className="h-6 w-6" />
    ) : (
      <HiXCircle className="h-6 w-6" />
    );

  const color = type == "success" ? "green" : "red";

  return (
    <AlertMT
      open={open}
      icon={icon}
      animate={{
        mount: { y: 0 },
        unmount: { y: 100 },
      }}
      className="fixed right-5 top-1 z-[999999] w-[25.5rem]"
      color={color}
    >
      {message}
    </AlertMT>
  );
}
