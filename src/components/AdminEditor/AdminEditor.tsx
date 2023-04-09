import { useSessionContext } from "@supabase/auth-helpers-react";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { Modal } from "../Modal/Modal";
import RadioTabs from "../RadioTabs/RadioTabs";
import style from "./AdminEditor.module.scss";

interface PortfolioItem {
  id: string;
  title: string;
}

export default function AdminEditor(): JSX.Element {
  const { locales, locale } = useRouter();
  const { supabaseClient } = useSessionContext();
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isModalEditModalOpen, setIsModalEditModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(locales![0]);
  const { handleSubmit, register } = useForm();

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

  const onSubmit = async (data: any) => {
    console.log("Submitting!", data);
  };

  useEffect(() => {
    getPortfolioItems();
  }, []);

  return (
    <div className="card">
      <Modal
        isOpen={isModalEditModalOpen}
        onClose={() => setIsModalEditModalOpen(false)}
        onPrimaryAction={handleSubmit(onSubmit)}
        title="Modal Title"
      >
        <RadioTabs
          onChange={setSelectedLanguage}
          selectedValue={selectedLanguage}
          options={locales!.map((locale) => ({
            label: locale,
            value: locale,
          }))}
        />

        <br />

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          {locales!.map((locale) => (
            <div
              key={locale}
              className={clsx({
                "portfolio-item-form": true,
                [style["is-hidden"]]: selectedLanguage !== locale,
              })}
            >
              <label htmlFor={`title-${locale}`} className="form-control-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id={`title-${locale}`}
                {...register(`title-${locale}`, { required: true })}
              />

              <br />

              <label
                htmlFor={`description-${locale}`}
                className="form-control-label"
              >
                Description
              </label>
              <textarea
                id={`description-${locale}`}
                className="form-control"
                {...register(`description-${locale}`, { required: true })}
              />
            </div>
          ))}

          <button type="submit" style={{ display: "none" }}></button>
        </form>
      </Modal>

      <button className="form-control" onClick={signOut}>
        Sign out
      </button>

      {portfolioItems.map((item) => {
        return (
          <div key={item.id} className={style["portfolio-item"]}>
            <div className={style["portfolio-item__title"]}>{item.title}</div>
            <div className={style["portfolio-item__actions"]}>
              <button
                className={style["icon-button"]}
                title="Edit"
                onClick={() => setIsModalEditModalOpen(true)}
              >
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
