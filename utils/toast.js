import Toast from "react-hot-toast";
import Alert from "@/components/Alert";

export default function toast(message, type) {
  Toast.custom(() => {
    return <Alert message={message} type={type} />;
  });
}
