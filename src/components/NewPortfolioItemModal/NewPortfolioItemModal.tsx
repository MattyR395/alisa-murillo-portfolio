import { getAdminPortfolioItem } from "@/lib/get-portfolio-item";
import { insertPortfolioItem } from "@/lib/insert-portfolio-item";
import { insertFilePath, resizeFile, uploadFile } from "@/lib/upload-files";
import { useAdminAppStore } from "@/store/admin-store";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "../Button/Button";
import ImageUploader, { ImageFile } from "../ImageUploader/ImageUploader";
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
  const { addItem: addPortfolioItem } = useAdminAppStore(
    (state) => state.portfolioItems
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [isImageUploadDirty, setIsImageUploadDirty] = useState(false);
  const [images, setImages] = useState<ImageFile[]>([]);

  const onSubmit = async (data: PortfolioItemFormFields) => {
    setIsLoading(true);
    const newItemId = await insertPortfolioItem(
      {
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

      // Upload the images and insert the file paths into the database.
      await uploadImages(newItemId);

      newItem && addPortfolioItem(newItem);
    }

    setIsLoading(false);
    props.onClose();
  };

  /**
   * Uploads the images and inserts the file paths into the database.
   *
   * @param portfolioItemId ID of the portfolio item to associate the images with.
   */
  const uploadImages = async (portfolioItemId: number): Promise<void> => {
    for (const image of images) {
      const resizedImage = await resizeFile(image);
      const uploadedPath = await uploadFile(resizedImage, supabaseClient);
      insertFilePath(portfolioItemId, uploadedPath, supabaseClient);
    }
  };

  /**
   * If there are unsaved changes, ask the user if they want to close the modal before doing so.
   */
  const tryClosing = () => {
    if (isFormDirty || isImageUploadDirty) {
      if (
        confirm(
          "You have unsaved changes. Are you sure you want to close this window?"
        )
      ) {
        props.onClose();
      }
    } else {
      props.onClose();
    }
  };

  const getModalFooter = () => {
    return (
      <>
        <Button onClick={tryClosing} style="secondary">
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
        onClose={() => tryClosing()}
        title="New portfolio item"
        footer={getModalFooter()}
      >
        <PortfolioItemForm
          onSubmit={onSubmit}
          isDirty={(isDirty) => setIsFormDirty(isDirty)}
        />

        <hr />

        <ImageUploader
          isDirty={(isDirty) => setIsImageUploadDirty(isDirty)}
          onUpdate={(images) => setImages(images)}
        />
      </Modal>
    );
  };

  return getModal();
}
