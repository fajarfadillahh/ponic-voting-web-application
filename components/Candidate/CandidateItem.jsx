import { HiCheck } from "react-icons/hi";
import { Progress, Typography } from "@material-tailwind/react";

export default function CandidateItem({
  candidate,
  index,
  isSelected,
  onClick,
  isAvailable,
}) {
  return (
    <div className="flex w-full items-center justify-between gap-10 rounded-lg border-[2px] border-gray-200 p-6">
      <div className="flex w-full items-start gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-200 text-[24px] font-bold text-gray-900">
          {index + 1}
        </div>

        <div className="flex w-full flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Typography color="blue-gray" className="text-[28px] font-bold">
              {candidate.name}
            </Typography>
            <Typography variant="small" color="gray" className="font-medium">
              Kandidat / Opsi {index + 1}
            </Typography>
          </div>

          <div className="flex w-full items-center gap-4">
            <Progress value={candidate.percentage} color="pink" />
            <Typography
              variant="paragraph"
              color="blue-gray"
              className="font-bold"
            >
              {candidate.percentage}%
            </Typography>
          </div>
        </div>
      </div>

      {isAvailable ? (
        <div
          className={`flex aspect-square h-[64px] w-[64px] cursor-pointer items-center justify-center rounded-lg text-[2rem] ${
            isSelected
              ? "bg-pink-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-pink-500 hover:text-white"
          }`}
          onClick={onClick}
        >
          <HiCheck />
        </div>
      ) : null}
    </div>
  );
}
