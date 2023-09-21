// import components
import {
  HiOutlineCog,
  HiOutlineExternalLink,
  HiOutlineTrash,
} from "react-icons/hi";
import { IconButton, Tooltip, Typography } from "@material-tailwind/react";
import Status from "@/components/Status";
import DeleteDialog from "@/components/DeleteDialog";
import Link from "next/link";

// import utils
import { convertTime } from "@/utils/convert";
import fetcher from "@/utils/fetcher";
import toast from "@/utils/toast";
import messages from "@/utils/messages";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function CardVoting({ room, mutate }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const token = Cookies.get("token");
  const router = useRouter();

  const [status, setStatus] = useState(() => {
    if (Date.now() < room.start) {
      return "menunggu";
    } else if (Date.now() > room.end) {
      return "selesai";
    } else if (Date.now() > room.start) {
      return "berjalan";
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() < room.start) {
        setStatus("menunggu");
      } else if (Date.now() > room.end) {
        setStatus("selesai");
      } else if (Date.now() > room.start) {
        setStatus("berjalan");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [room.start, room.end]);

  const handleDeleteVoting = async (room_id, code) => {
    try {
      setIsLoading(true);
      const { data, status } = await fetcher(
        "/rooms",
        "DELETE",
        {
          room_id: room_id,
          code: code,
        },
        token,
      );
      if (data.success) {
        setOpen(false);
        mutate();
        toast(messages[status]`hapus`, "success");
      }
    } catch (error) {
      setIsLoading(false);

      const response = error.response;

      response.data.errors.map((error) => {
        toast(error.message, "error");
      });
    }
  };

  return (
    <div className="group relative w-full max-w-[405px] rounded-lg border-[2px] border-gray-200 p-6 transition hover:border-pink-500 hover:shadow-[4px_4px_20px_rgba(233,30,99,0.2)] dark:border-gray-900 dark:hover:border-pink-500">
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
          className="absolute -left-5 -top-4 z-30 translate-y-4 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100"
        >
          <IconButton size="md" color="pink" className="rounded-full text-xl">
            <HiOutlineExternalLink />
          </IconButton>
        </Link>
      </Tooltip>

      <div className="grid gap-8">
        <div className="inline-flex items-start justify-between gap-2">
          <div className="grid gap-3">
            <div className="max-w-[270px]">
              <Tooltip
                content={
                  <div className="w-80">
                    <Typography
                      color="white"
                      className="font-medium capitalize"
                    >
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
                <Link href={`/rooms/${room.code}`}>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="line-clamp-2 font-bold capitalize hover:text-pink-500 dark:text-white dark:hover:text-pink-500"
                  >
                    {room.name}
                  </Typography>
                </Link>
              </Tooltip>
            </div>

            <div className="flex items-start gap-8">
              <div className="inline-flex flex-col gap-1">
                <Typography
                  color="gray"
                  className="text-[12px] font-medium dark:text-gray-500"
                >
                  Kode voting:
                </Typography>
                <Typography variant="h6" color="pink" className="font-bold">
                  {room.code}
                </Typography>
              </div>

              <div className="inline-flex flex-col gap-1">
                <Typography
                  color="gray"
                  className="text-[12px] font-medium dark:text-gray-500"
                >
                  Status voting:
                </Typography>
                <Status status={status} />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {status == "berjalan" || status == "selesai" ? null : (
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
                  className="bg-gray-200 text-xl text-gray-900 dark:bg-gray-900 dark:text-gray-500"
                  onClick={() => router.push(`/dashboard/edit/${room.id}`)}
                >
                  <HiOutlineCog />
                </IconButton>
              </Tooltip>
            )}

            <Tooltip
              content="Hapus voting"
              placement="top"
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
            >
              <IconButton
                size="md"
                color="red"
                className="text-xl"
                onClick={() => setOpen(true)}
              >
                <HiOutlineTrash />
              </IconButton>
            </Tooltip>

            <DeleteDialog
              open={open}
              handleOpen={() => setOpen(!open)}
              handleDeleteVoting={() => handleDeleteVoting(room.id, room.code)}
              isLoading={isLoading}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="grid gap-1">
            <Typography
              color="gray"
              className="text-[12px] font-medium dark:text-gray-500"
            >
              Waktu mulai:
            </Typography>
            <Typography
              variant="h6"
              color="blue-gray"
              className="max-w-[170px] font-bold dark:text-white"
            >
              {convertTime(room.start)}
            </Typography>
          </div>

          <div className="grid gap-1">
            <Typography
              color="gray"
              className="text-[12px] font-medium dark:text-gray-500"
            >
              Waktu selesai:
            </Typography>
            <Typography
              variant="h6"
              color="blue-gray"
              className="max-w-[170px] font-bold dark:text-white"
            >
              {convertTime(room.end)}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
