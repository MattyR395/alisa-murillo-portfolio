import clsx from "clsx";
import { Modal } from "../Modal/Modal";

export default function ConfirmModal(props: {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText: string;
  isLoading?: boolean;
  isActionDestuctive?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}): JSX.Element {
  const {
    isOpen,
    title,
    description,
    confirmText,
    onConfirm,
    isLoading,
    onClose,
  } = props;

  const getModalFooter = () => {
    return (
      <>
        <button
          className="form-control form-control--secondary"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={isLoading}
          className={clsx({
            "form-control": true,
            "form-control--danger": props.isActionDestuctive,
            "is-loading": isLoading,
          })}
          style={{ minWidth: "5rem" }}
        >
          <span>{confirmText}</span>
        </button>
      </>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      title={title}
      onClose={onClose}
      footer={getModalFooter()}
      maxWidth="28rem"
    >
      <p>{description}</p>
    </Modal>
  );
}
