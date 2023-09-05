import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { HiBell } from "react-icons/hi";

export default function DeleteDialog({ open, handleOpen, handleDeleteVoting }) {
  return (
    <Dialog open={open} handler={handleOpen} size="xs">
      <DialogHeader>
        <Typography variant="h5" color="blue-gray" className="font-extrabold">
          PERHATIAN
        </Typography>
      </DialogHeader>
      <DialogBody divider className="grid place-items-center py-6">
        <HiBell className="text-[3rem] text-red-500" />
        <Typography color="red" variant="h4" className="pb-2 pt-4 font-bold">
          Kamu harus baca ini!
        </Typography>
        <Typography variant="paragraph" className="text-center font-medium">
          Dengan kamu mengeklik tombol hapus, data kamu akan terhapus permanen.
          Apakah kamu yakin ingin menghapusnya?
        </Typography>
      </DialogBody>
      <DialogFooter className="space-x-2">
        <Button
          size="md"
          variant="text"
          color="blue-gray"
          className="text-[14px] capitalize"
          onClick={handleOpen}
        >
          batal
        </Button>
        <Button
          size="md"
          variant="red"
          color="red"
          className="text-[14px] capitalize"
          onClick={handleDeleteVoting}
        >
          hapus
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
