import { HiOutlineX } from "react-icons/hi";
import { Typography, Tooltip } from "@material-tailwind/react";

// import components
import Form from "@/components/Form";

export default function CandidateForm({
  candidate,
  removeCandidateForm,
  index,
  handleCandidateName,
}) {
  return (
    <div className="relative grid w-[405px] gap-8 rounded-lg border-[2px] border-gray-200 p-6">
      <Tooltip
        content="Hapus kandidat/opsi"
        placement="top"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0, y: 25 },
        }}
      >
        <div
          className="absolute right-3 top-3 cursor-pointer rounded-lg p-2 text-[20px] text-gray-700 hover:bg-gray-200"
          onClick={() => removeCandidateForm(candidate.id)}
        >
          <HiOutlineX />
        </div>
      </Tooltip>

      <div className="flex aspect-square w-16 items-center justify-center justify-self-center rounded-full bg-gray-200 text-[24px] font-bold text-gray-900">
        {index + 1}
      </div>

      <div className="grid gap-2">
        <Typography color="blue-gray" className="text-[18px] font-semibold">
          Nama Kandidat / Opsi
        </Typography>
        <Form
          type="text"
          placeholder="Masukkan Nama"
          className="w-full"
          value={candidate.name}
          onChange={(e) => handleCandidateName(e.target.value, candidate.id)}
        />
      </div>
    </div>
  );
}
