import { Spinner } from "@material-tailwind/react";

export default function LoadingButton({ className }) {
  return (
    <div
      className={`flex cursor-not-allowed items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-900 ${className}`}
    >
      <Spinner className="dark:text-gray-200" />
    </div>
  );
}
