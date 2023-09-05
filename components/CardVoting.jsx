import Link from "next/link";
import { useRouter } from "next/router";
import {
  HiOutlineCog,
  HiOutlineExternalLink,
  HiOutlineTrash,
} from "react-icons/hi";
import { IconButton, Tooltip, Typography } from "@material-tailwind/react";

// import components
import Status from "@/components/Status";

// import utils
import { convertTime } from "@/utils/convert";

export default function CardVoting({ room }) {
  const router = useRouter();

  return (
    <div className="group relative w-full max-w-[405px] rounded-lg border-[2px] border-gray-200 p-6 transition hover:border-pink-500 hover:shadow-[4px_4px_20px_rgba(233,30,99,0.2)]">
      <Tooltip
        content="Ikutan voting"
        placement="top"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0, y: 25 },
        }}
      >
        <Link
          href={`/rooms/${room.code}`}
          target="_blank"
          className="absolute -left-5 -top-4 z-30 translate-y-4 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100"
        >
          <IconButton size="md" color="pink" className="rounded-full text-xl">
            <HiOutlineExternalLink />
          </IconButton>
        </Link>
      </Tooltip>

      <div className="grid gap-8">
        <div className="inline-flex items-start justify-between">
          <div className="grid gap-3">
            <div className="max-w-[270px]">
              <Tooltip
                content={
                  <div className="w-80">
                    <Typography color="white" className="font-medium">
                      {room.name}
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
                  {room.name}
                </Typography>
              </Tooltip>
            </div>

            <div className="flex max-w-[270px] items-center gap-6">
              <div className="inline-flex items-center gap-1">
                <Typography color="gray" className="text-[12px] font-medium">
                  Kode voting:
                </Typography>
                <Typography variant="small" color="pink" className="font-bold">
                  {room.code}
                </Typography>
              </div>

              <Status start={room.start} end={room.end} />
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
                onClick={() => router.push(`/dashboard/edit/${room.id}`)}
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
              {convertTime(room.start)}
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
              {convertTime(room.end)}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
