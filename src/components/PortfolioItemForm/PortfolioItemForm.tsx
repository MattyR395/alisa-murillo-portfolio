import clsx from "clsx";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import RadioTabs from "../RadioTabs/RadioTabs";

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
  const { handleSubmit, register } = useForm<PortfolioItemFormFields>();
  const { locales } = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState(locales![0]);

  return (
    <>
      <RadioTabs
        onChange={setSelectedLanguage}
        selectedValue={selectedLanguage}
        options={locales!.map((locale) => ({
          label: locale,
          value: locale,
        }))}
      />

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

        {/* Invisible button to enable submitting with Enter */}
        <button type="submit" style={{ display: "none" }}></button>
      </form>
    </>
  );
}
