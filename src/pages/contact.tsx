import ValidationTooltip from "@/components/ValidationTooltip/ValidationTooltip";
import { validateEmail } from "@/utils/validation/email";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import style from "./Contact.module.scss";

export default function Contact(): JSX.Element {
  const { t } = useTranslation("contact");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => console.log(data);

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
          />
          <ValidationTooltip messages={[t("form.message.required")]} />
        </div>

        <button className="form-control" type="submit">
          {t("form.submit")}
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
