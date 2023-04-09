import { useSessionContext } from "@supabase/auth-helpers-react";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "../Modal/Modal";
import RadioTabs from "../RadioTabs/RadioTabs";
import style from "./EditPortfolioItemModal.module.scss";

export default function EditPortfolioItemModal(props: {
  isOpen: boolean;
  portfolioItemId: number;
  onClose: () => void;
}) {
  const { handleSubmit, register } = useForm();
  const { locales } = useRouter();
  const { supabaseClient } = useSessionContext();
  const [selectedLanguage, setSelectedLanguage] = useState(locales![0]);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: {
    [key: string]: {
      title: string;
      description: string;
      localeId: string;
    };
  }) => {
    setIsLoading(true);

    await updatePortfolioItemText(props.portfolioItemId, Object.values(data));

    setIsLoading(false);

    console.log("Submitting!", data, "ID: ", props.portfolioItemId);
  };

  const updatePortfolioItemText = async (
    id: number,
    text: {
      title: string;
      description: string;
      localeId: string;
    }[]
  ) => {
    const { data, error } = await supabaseClient.from("translations").upsert(
      text.map((t) => ({
        portfolioItemId: id,
        title: t.title,
        description: t.description,
        localeId: t.localeId,
      }))
    );

    console.log(data, error);

    if (error) {
      throw error;
    }

    console.log("Updated!", data);
  };

  const getModal = () => {
    return (
      <Modal
        isOpen={props.isOpen}
        onClose={() => props.onClose()}
        onPrimaryAction={handleSubmit(onSubmit)}
        title="Modal Title"
        isLoading={isLoading}
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
                {...register(`${locale}.title`, { required: true })}
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
                {...register(`${locale}.description`, { required: true })}
              />

              <input
                aria-hidden={true}
                style={{ display: "none" }}
                type="text"
                {...register(`${locale}.localeId`, {
                  value: locale,
                })}
              />
            </div>
          ))}

          <button type="submit" style={{ display: "none" }}></button>
        </form>
      </Modal>
    );
  };

  return getModal();
}
