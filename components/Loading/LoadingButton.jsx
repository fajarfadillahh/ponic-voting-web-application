import { Spinner } from "@material-tailwind/react";

export default function LoadingButton({ className }) {
  return (
    <div
      className={`flex cursor-not-allowed items-center justify-center rounded-lg bg-gray-200 ${className}`}
    >
      <Spinner />
    </div>
  );
}
