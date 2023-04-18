import emptyStateImage from "@/../public/portfolio-items-empty-state.svg";
import { useAdminAppStore } from "@/store/admin-store";
import { useSessionContext } from "@supabase/auth-helpers-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import EmptyState from "../EmptyState/EmptyState";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import NewPortfolioItemModal from "../NewPortfolioItemModal/NewPortfolioItemModal";
import PortfolioItemBar from "../PortfolioItemBar/PortfolioItemBar";

export default function AdminEditor(): JSX.Element {
  const { locale } = useRouter();
  const { supabaseClient } = useSessionContext();
  const {
    items: portfolioItems,
    setItems: setPortfolioItems,
    isLoading: arePortfolioItemsLoading,
    setIsLoading: setArePortfolioItemsLoading,
  } = useAdminAppStore((state) => state.portfolioItems);

  const [isNewPortfolioItemModalOpen, setIsNewPortfolioItemModalOpen] =
    useState(false);

  const getPortfolioItems = async () => {
    setArePortfolioItemsLoading(true);
    const { data, error } = await supabaseClient
      .rpc("get_portfolio_items", { locale_id: locale })
      .select("id, title, thumbUrl");

    if (error) {
      throw error;
    }

    setPortfolioItems(data);
    setArePortfolioItemsLoading(false);
  };

  useEffect(() => {
    getPortfolioItems();
  }, []);

  return (
    <div className="card">
      <div className="card__header">
        <h1>Portfolio items</h1>

        <button
          className="form-control form-control--icon"
          onClick={() => setIsNewPortfolioItemModalOpen(true)}
        >
          <FaPlus />
        </button>

        <NewPortfolioItemModal
          isOpen={isNewPortfolioItemModalOpen}
          onClose={() => setIsNewPortfolioItemModalOpen(false)}
        />
      </div>

      <EmptyState
        isVisible={!portfolioItems.length && !arePortfolioItemsLoading}
        icon={<Image src={emptyStateImage} alt="Add a portfolio item" />}
        title="Looking empty!"
        description="Start adding portfolio items using the button above."
      />

      <LoadingIndicator isVisible={arePortfolioItemsLoading} />

      {portfolioItems.map((item) => {
        return (
          <PortfolioItemBar key={item.id} id={item.id} title={item.title} />
        );
      })}
    </div>
  );
}
