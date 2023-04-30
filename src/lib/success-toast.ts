import { toast } from "react-toastify";

export const successToast = (message: string): void => {
  toast(message, {
    type: "success",
    position: "bottom-center",
    autoClose: 7000,
  });
};
