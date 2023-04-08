import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { Modal } from "../Modal/Modal";
import style from "./AdminEditor.module.scss";

interface PortfolioItem {
  id: string;
  title: string;
}

export default function AdminEditor(): JSX.Element {
  const { supabaseClient } = useSessionContext();
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const { locale } = useRouter();

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
      <Modal isOpen={true} onClose={() => {}} title="Modal Title">
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
          distinctio numquam at quos eaque quae et harum sunt repellat ex.
        </div>
      </Modal>

      <button className="form-control" onClick={signOut}>
        Sign out
      </button>

      {portfolioItems.map((item) => {
        return (
          <div key={item.id} className={style["portfolio-item"]}>
            <div className={style["portfolio-item__title"]}>{item.title}</div>
            <div className={style["portfolio-item__actions"]}>
              <button className={style["icon-button"]} title="Edit">
                <FaRegEdit />
              </button>
              <button className={style["icon-button"]} title="Delete">
                <FaRegTrashAlt />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
