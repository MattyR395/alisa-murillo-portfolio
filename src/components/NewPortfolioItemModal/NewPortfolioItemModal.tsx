import { addPortfolioItem } from "@/lib/add-portfolio-item";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useState } from "react";
import Button from "../Button/Button";
import { Modal } from "../Modal/Modal";
import PortfolioItemForm, {
  PortfolioItemFormFields,
} from "../PortfolioItemForm/PortfolioItemForm";

export default function NewPortfolioItemModal(props: {
  isOpen: boolean;
  onClose: () => void;
}): JSX.Element {
  const { supabaseClient } = useSessionContext();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: PortfolioItemFormFields) => {
    setIsLoading(true);
    await addPortfolioItem(
      {
        thumbUrl:
          "https://alisamurillo.com/resource/img/portfolio/breaktherules/1/md.jpg",
        translations: Object.values(data),
      },
      supabaseClient
    );
    setIsLoading(false);
    props.onClose();
  };

  const getModalFooter = () => {
    return (
      <>
        <Button onClick={props.onClose} style="secondary">
          Cancel
        </Button>

        <Button
          isLoading={isLoading}
          isSubmit={true}
          formId="portfolio_item_form"
        >
          Add
        </Button>
      </>
    );
  };

  const getModal = () => {
    return (
      <Modal
        isOpen={props.isOpen}
        onClose={() => props.onClose()}
        title="New portfolio item"
        footer={getModalFooter()}
      >
        <PortfolioItemForm onSubmit={onSubmit} />
      </Modal>
    );
  };

  return getModal();
}
