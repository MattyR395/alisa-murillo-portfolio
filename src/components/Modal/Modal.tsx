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
            <div className={style.modal__dialog__footer}>
              <button
                className="form-control form-control--secondary"
                onClick={props.onClose}
              >
                Cancel
              </button>
              <button className="form-control" style={{ minWidth: "5rem" }}>
                Save
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
