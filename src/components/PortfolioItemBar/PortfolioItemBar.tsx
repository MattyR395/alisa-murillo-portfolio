import { deletePortfolioItem } from "@/lib/delete-portfolio-item";
import { useAdminAppStore } from "@/store/admin-store";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import EditPortfolioItemModal from "../EditPortfolioItemModal/EditPortfolioItemModal";
import style from "./PortfolioItemBar.module.scss";

export default function PortfolioItemBar(props: {
  id: number;
  title: string;
}): JSX.Element {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const { supabaseClient } = useSessionContext();
  const { deleteItem: deletePortfolioItemState } = useAdminAppStore(
    (state) => state.portfolioItems
  );

  const handleDelete = () => {
    setIsDeleteLoading(true);

    deletePortfolioItem(props.id, supabaseClient)
      .then(() => {
        deletePortfolioItemState(props.id);
      })
      .finally(() => {
        setIsDeleteLoading(false);
        setIsDeleteModalOpen(false);
      });
  };

  return (
    <>
      <EditPortfolioItemModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        portfolioItemId={props.id}
      />

      <ConfirmModal
        confirmText="Remove"
        description="This will remove all related images too"
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Remove portfolio item?"
        onConfirm={handleDelete}
        isLoading={isDeleteLoading}
        isActionDestuctive={true}
      ></ConfirmModal>

      <div className={style["portfolio-item"]}>
        <div className={style["portfolio-item__title"]}>{props.title}</div>
        <div className={style["portfolio-item__actions"]}>
          <button
            className="form-control form-control--icon"
            title="Edit"
            onClick={() => setIsEditModalOpen(true)}
          >
            <FaRegEdit />
          </button>
          <button
            className="form-control form-control--icon"
            title="Delete"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            <FaRegTrashAlt />
          </button>
        </div>
      </div>
    </>
  );
}
