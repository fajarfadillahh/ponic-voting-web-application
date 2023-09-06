import Toast from "react-hot-toast";

export default function toast(message, type) {
  if (type == "success") {
    Toast.success(message, {
      duration: 3500,
      position: "bottom-right",
    });
  }

  if (type == "error") {
    Toast.error(message, {
      duration: 3500,
      position: "bottom-right",
    });
  }
}
