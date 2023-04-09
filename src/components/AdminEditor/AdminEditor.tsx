import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import EditPortfolioItemModal from "../EditPortfolioItemModal/EditPortfolioItemModal";
import style from "./AdminEditor.module.scss";

interface PortfolioItem {
  id: number;
  title: string;
}

export default function AdminEditor(): JSX.Element {
  const { locale } = useRouter();
  const { supabaseClient } = useSessionContext();
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [currentOpenModal, setCurrentOpenModal] = useState<number | null>(null);

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
      <button className="form-control" onClick={signOut}>
        Sign out
      </button>

      {portfolioItems.map((item) => {
        return (
          <Fragment key={item.id}>
            <EditPortfolioItemModal
              isOpen={currentOpenModal === item.id}
              onClose={() => setCurrentOpenModal(null)}
              portfolioItemId={item.id}
            />

            <div className={style["portfolio-item"]}>
              <div className={style["portfolio-item__title"]}>{item.title}</div>
              <div className={style["portfolio-item__actions"]}>
                <button
                  className={style["icon-button"]}
                  title="Edit"
                  onClick={() => setCurrentOpenModal(item.id)}
                >
                  <FaRegEdit />
                </button>
                <button className={style["icon-button"]} title="Delete">
                  <FaRegTrashAlt />
                </button>
              </div>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
