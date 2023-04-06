import ValidationTooltip from "@/components/ValidationTooltip/ValidationTooltip";
import { validateEmail } from "@/utils/validation/email";
import useWeb3Forms from "@web3forms/react";
import clsx from "clsx";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import style from "./Contact.module.scss";

interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

export default function Contact(): JSX.Element {
  const { t } = useTranslation("contact");
  const [isContactSubmitLoading, setIsContactSubmitLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>();

  const { submit: web3FormSubmit } = useWeb3Forms({
    access_key: process.env.NEXT_PUBLIC_WEB3_FORMS_API_KEY ?? "",
    settings: {
      from_name: "Mail bot",
      subject: "Contact form enquiry",
    },
    onSuccess: () => {
      setIsContactSubmitLoading(false);
      reset();
    },
    onError: () => {
      setIsContactSubmitLoading(false);
      alert(t("form.error"));
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    setIsContactSubmitLoading(true);
    web3FormSubmit(data);
  };

  return (
    <div className={style.contact}>
      <hgroup className={style.contact__intro}>
        <h1>{t("header")}</h1>
        <p>{t("subheader")}</p>
      </hgroup>

      <form
        className={style.contact__form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div>
          <label className="form-control-label" htmlFor="contactNameInput">
            {t("form.name.label")}
          </label>
          <input
            {...register("name", { required: true })}
            aria-invalid={errors.name ? "true" : "false"}
            type="text"
            className="form-control"
            id="contactNameInput"
            placeholder={t("form.name.placeholder")}
            disabled={isContactSubmitLoading}
          />
          <ValidationTooltip messages={[t("form.name.required")]} />
        </div>

        <div>
          <label className="form-control-label" htmlFor="contactEmailInput">
            {t("form.email.label")}
          </label>
          <input
            {...register("email", { validate: validateEmail })}
            aria-invalid={errors.email ? "true" : "false"}
            type="email"
            className="form-control"
            id="contactEmailInput"
            placeholder={t("form.email.placeholder")}
            disabled={isContactSubmitLoading}
          />

          <ValidationTooltip messages={[t("form.email.invalid")]} />
        </div>

        <div className={style.contact__message}>
          <label className="form-control-label" htmlFor="contactMessageInput">
            {t("form.message.label")}
          </label>
          <textarea
            {...register("message", { required: true })}
            aria-invalid={errors.message ? "true" : "false"}
            className="form-control"
            id="contactMessageInput"
            rows={4}
            placeholder={t("form.message.placeholder")}
            disabled={isContactSubmitLoading}
          />
          <ValidationTooltip messages={[t("form.message.required")]} />
        </div>

        <button
          className={clsx({
            "form-control": true,
            "is-loading": isContactSubmitLoading,
          })}
          disabled={isContactSubmitLoading}
          type="submit"
        >
          <span>{t("form.submit")}</span>
        </button>
      </form>

      <div className={style.contact__details}>
        <ul>
          <li>
            <label className="form-control-label">{t("email")}</label>
            <Link href="mailto:alisamurillo@gmail.com">
              alisamurillo@gmail.com
            </Link>
          </li>
          <li>
            <label className="form-control-label">{t("phone")}</label>
            <Link href="tel:+447759 435288">(+44) 7759 435288</Link>
          </li>
          <li>
            <label className="form-control-label">LinkedIn</label>
            <Link href="https://linkedin.com/in/alisa-murillo-6b180818b">
              Alisa Murillo
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
