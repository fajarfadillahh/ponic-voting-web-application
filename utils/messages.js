const messages = {
  title: "Oops..",
  expired: "Sesi berakhir. Login lagi yuk 😄",
  200: (data) => {
    return `Yeay ${data} datanya berhasil 😄`;
  },
  201: (data) => {
    if (data == "vote") return "Yeay berhasil ngevote 😄";

    return `Yeay berhasil bikin ${data} 😄`;
  },
  202: "Sabar ya votingnya belum dimulai 😄",
  400: "Kayaknya ada yang salah sama kamu deh 😐",
  401: "Kamu belum login nih 😄",
  404: "Halaman yang kamu cari kayaknya ga ada 😐",
  409: "Kamu cuma boleh vote 1 kali ya 😄",
  500: "Waduh server kita bermasalah nih 😭",
  P2003: "Datanya gabisa dihapus karna sudah divote 😀",
};

export default messages;
