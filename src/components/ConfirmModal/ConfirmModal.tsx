import Button from "../Button/Button";
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
        <Button onClick={onClose} style="secondary">
          Cancel
        </Button>
        <Button isLoading={isLoading} onClick={onConfirm} style="danger">
          {confirmText}
        </Button>
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
