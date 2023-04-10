import clsx from "clsx";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import RadioTabs from "../RadioTabs/RadioTabs";
import ValidationTooltip from "../ValidationTooltip/ValidationTooltip";
import style from "./PortfolioItemForm.module.scss";

export interface PortfolioItemFormFields {
  [locale: string]: {
    title: string;
    description: string;
    localeId: string;
  };
}

export default function PortfolioItemForm(props: {
  onSubmit: (data: PortfolioItemFormFields) => void;
}): JSX.Element {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PortfolioItemFormFields>();
  const { locales } = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState(locales![0]);

  return (
    <>
      <span className={style["validation-popup-container"]}>
        <RadioTabs
          onChange={setSelectedLanguage}
          selectedValue={selectedLanguage}
          options={locales!.map((locale) => ({
            label: locale,
            value: locale,
          }))}
        />

        {!!Object.keys(errors).length && (
          <div className={style["validation-popup"]}>
            Please make sure to fill in all fields for each language.
          </div>
        )}
      </span>

      <br />

      <form
        noValidate
        onSubmit={handleSubmit(props.onSubmit)}
        id="portfolio_item_form"
      >
        {locales!.map((locale) => (
          <div
            key={locale}
            className={clsx({
              "portfolio-item-form": true,
              "is-hidden": selectedLanguage !== locale,
            })}
          >
            <label htmlFor={`title-${locale}`} className="form-control-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id={`title-${locale}`}
              aria-invalid={errors[locale]?.title ? "true" : "false"}
              {...register(`${locale}.title`, { required: true })}
            />
            <ValidationTooltip messages={["Title is required"]} />

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
              aria-invalid={errors[locale]?.description ? "true" : "false"}
              {...register(`${locale}.description`, { required: true })}
            />
            <ValidationTooltip messages={["Description is required"]} />

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

        {/* Invisible button to enable submitting with Enter */}
        <button type="submit" style={{ display: "none" }}></button>
      </form>
    </>
  );
}
