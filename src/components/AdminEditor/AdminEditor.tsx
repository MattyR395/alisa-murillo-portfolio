import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import NewPortfolioItemModal from "../NewPortfolioItemModal/NewPortfolioItemModal";
import PortfolioItemBar from "../PortfolioItemBar/PortfolioItemBar";

interface PortfolioItem {
  id: number;
  title: string;
}

export default function AdminEditor(): JSX.Element {
  const { locale } = useRouter();
  const { supabaseClient } = useSessionContext();
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isNewPortfolioItemModalOpen, setIsNewPortfolioItemModalOpen] =
    useState(false);
  const [arePortfolioItemsLoading, setArePortfolioItemsLoading] =
    useState(true);

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

      <LoadingIndicator isVisible={arePortfolioItemsLoading} />

      {portfolioItems.map((item) => {
        return (
          <PortfolioItemBar key={item.id} id={item.id} title={item.title} />
        );
      })}
    </div>
  );
}
