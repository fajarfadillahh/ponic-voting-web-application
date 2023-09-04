const messages = {
  title: "Oops..",
  expired: "Sesi berakhir. Login lagi yuk 😄",
  201: (data) => {
    if (data == "vote") return "Yeay berhasil ngevote 😄";

    return `Yeay berhasil bikin ${data} 😄`;
  },
  202: "Sabar ya votingnya belum dimulai 😄",
  401: "Kamu belum login nih 😄",
  409: "Kamu cuma boleh vote 1 kali ya 😄",
  400: "Kayaknya ada yang salah sama kamu deh 😐",
  404: "Halaman yang kamu cari kayaknya ga ada 😐",
  500: "Waduh server kita bermasalah nih 😭",
  P2003: "Datanya gabisa dihapus karna sudah divote 😀",
};

export default messages;
