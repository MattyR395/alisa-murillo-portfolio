import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import PortfolioItemBar from "../PortfolioItemBar/PortfolioItemBar";

interface PortfolioItem {
  id: number;
  title: string;
}

export default function AdminEditor(): JSX.Element {
  const { locale } = useRouter();
  const { supabaseClient } = useSessionContext();
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);

  const getPortfolioItems = async () => {
    const { data, error } = await supabaseClient
      .rpc("get_portfolio_items", { locale_id: locale })
      .select("id, title, thumbUrl");

    if (error) {
      throw error;
    }

    setPortfolioItems(data);
  };

  const signOut = async () => {
    await supabaseClient.auth.signOut();
  };

  useEffect(() => {
    getPortfolioItems();
  }, []);

  return (
    <div className="card">
      <div className="card__header">
        <h1>Portfolio items</h1>

        <button className="form-control form-control--icon">
          <FaPlus />
        </button>
      </div>

      {portfolioItems.map((item) => {
        return (
          <PortfolioItemBar key={item.id} id={item.id} title={item.title} />
        );
      })}
    </div>
  );
}
