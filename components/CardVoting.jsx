import { HiOutlineCog, HiOutlineTrash } from "react-icons/hi";

// import material-components
import {
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";

export default function CardVoting() {
  return (
    <div className="w-full max-w-[405px] rounded-lg border-[2px] border-gray-200 p-6 transition hover:border-pink-500 hover:shadow-[4px_4px_20px_rgba(233,30,99,0.2)]">
      <div className="grid gap-8">
        <div className="inline-flex items-start justify-between">
          <div className="grid gap-3">
            <div className="max-w-[270px]">
              <Tooltip
                content={
                  <div className="w-80">
                    <Typography color="white" className="font-medium">
                      Pemilihan Ketua Himpunan Mahasiswa Universitas Indonesia
                    </Typography>
                  </div>
                }
                placement="top"
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0, y: 25 },
                }}
              >
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="line-clamp-2 font-bold"
                >
                  Pemilihan Ketua Himpunan Mahasiswa Universitas Indonesia
                </Typography>
              </Tooltip>
            </div>

            <div className="flex max-w-[270px] items-center justify-between">
              <div className="inline-flex items-center gap-1">
                <Typography color="gray" className="text-[12px] font-medium">
                  Kode voting:
                </Typography>
                <Typography variant="small" color="pink" className="font-bold">
                  KETHMXOU
                </Typography>
              </div>

              <Chip variant="ghost" color="green" size="sm" value="Selesai" />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Tooltip
              content="Edit voting"
              placement="top"
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
            >
              <IconButton
                size="md"
                className="bg-gray-200 text-xl text-gray-900"
              >
                <HiOutlineCog />
              </IconButton>
            </Tooltip>

            <Tooltip
              content="Hapus voting"
              placement="top"
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
            >
              <IconButton size="md" color="red" className="text-xl">
                <HiOutlineTrash />
              </IconButton>
            </Tooltip>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="grid gap-1">
            <Typography color="gray" className="text-[12px] font-medium">
              Waktu mulai:
            </Typography>
            <Typography
              variant="h6"
              color="blue-gray"
              className="max-w-[170px] font-bold"
            >
              Kamis 31/08/2023 10:00
            </Typography>
          </div>

          <div className="grid gap-1">
            <Typography color="gray" className="text-[12px] font-medium">
              Waktu selesai:
            </Typography>
            <Typography
              variant="h6"
              color="blue-gray"
              className="max-w-[170px] font-bold"
            >
              Minggu 03/09/2023 12:30
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
