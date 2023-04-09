import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import style from "./Modal.module.scss";

export function Modal(props: {
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
  title: string;
  footer: React.ReactNode;
}): JSX.Element {
  useEffect(() => {
    if (props.isOpen) {
      enableBodyScroll(document.body);
    } else {
      disableBodyScroll(document.body);
    }
  }, [props.isOpen]);

  return (
    <AnimatePresence>
      {props.isOpen && (
        <motion.div
          className={style.modal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={props.onClose}
        >
          <motion.div
            className={style.modal__dialog}
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className={style.modal__dialog__header}>
              <h2>{props.title}</h2>

              <button onClick={props.onClose} title="Close">
                <FaTimes />
              </button>
            </div>
            <div className={style.modal__dialog__body}>{props.children}</div>
            <div className={style.modal__dialog__footer}>{props.footer}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
