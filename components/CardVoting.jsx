// import material-components
import { Chip, Tooltip, Typography } from "@material-tailwind/react";

export default function CardVoting() {
  return (
    <div className="w-full max-w-[405px] rounded-lg border-[2px] border-gray-200 p-6">
      <div className="grid gap-9">
        <div className="grid gap-3">
          <div className="flex items-start justify-between gap-4">
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
                className="line-clamp-2 w-[260px] font-bold text-gray-900"
              >
                Pemilihan Ketua Himpunan Mahasiswa Universitas Indonesia
              </Typography>
            </Tooltip>

            <div className="flex flex-col gap-2">
              <div>edit</div>
              <div>delete</div>
            </div>
          </div>

          <div className="inline-flex items-center gap-6">
            <div className="inline-flex items-center gap-1">
              <Typography variant="small" className="font-medium text-gray-600">
                Kode voting:
              </Typography>
              <Typography
                variant="paragraph"
                color="pink"
                className="font-bold"
              >
                KETHMXOU
              </Typography>
            </div>

            <Chip variant="ghost" color="green" size="sm" value="Selesai" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="">waktu mulai</div>

          <div className="">waktu selesai</div>
        </div>
      </div>
    </div>
  );
}
