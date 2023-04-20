import { toast } from "react-toastify";

export const errorToast = (message: string): void => {
  toast(message, {
    type: "error",
    position: "bottom-center",
    autoClose: false,
  });
};
