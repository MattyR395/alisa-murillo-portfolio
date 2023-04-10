import { getAdminPortfolioItem } from "@/lib/get-portfolio-item";
import { insertPortfolioItem } from "@/lib/insert-portfolio-item";
import { useAdminAppStore } from "@/store/admin-store";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "../Button/Button";
import ImageUploader from "../ImageUploader/ImageUploader";
import { Modal } from "../Modal/Modal";
import PortfolioItemForm, {
  PortfolioItemFormFields,
} from "../PortfolioItemForm/PortfolioItemForm";

export default function NewPortfolioItemModal(props: {
  isOpen: boolean;
  onClose: () => void;
}): JSX.Element {
  const { locale } = useRouter();
  const { supabaseClient } = useSessionContext();
  const [isLoading, setIsLoading] = useState(false);
  const { addItem: addPortfolioItem } = useAdminAppStore(
    (state) => state.portfolioItems
  );

  const onSubmit = async (data: PortfolioItemFormFields) => {
    setIsLoading(true);
    const newItemId = await insertPortfolioItem(
      {
        thumbUrl:
          "https://alisamurillo.com/resource/img/portfolio/breaktherules/1/md.jpg",
        translations: Object.values(data),
      },
      supabaseClient
    );

    /**
     * If the new item was successfully created, fetch and add it to the state.
     */
    if (newItemId) {
      const newItem = await getAdminPortfolioItem(
        newItemId,
        locale!,
        supabaseClient
      );
      newItem && addPortfolioItem(newItem);
    }

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

        <hr />

        <ImageUploader />
      </Modal>
    );
  };

  return getModal();
}
