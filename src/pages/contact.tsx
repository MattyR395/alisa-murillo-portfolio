import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import style from "./Contact.module.scss";

export default function Contact(): JSX.Element {
  const { t } = useTranslation("contact");

  return (
    <div className={style.contact}>
      <hgroup className={style.contact__intro}>
        <h1>{t("header")}</h1>
        <p>{t("subheader")}</p>
      </hgroup>

      <form className={style.contact__form}>
        <div>
          <label className="form-control-label" htmlFor="contactNameInput">
            {t("form.name.label")}
          </label>
          <input
            type="text"
            className="form-control"
            id="contactNameInput"
            placeholder={t("form.name.placeholder")}
          />
        </div>

        <div>
          <label className="form-control-label" htmlFor="contactEmailInput">
            {t("form.email.label")}
          </label>
          <input
            type="email"
            className="form-control"
            id="contactEmailInput"
            placeholder={t("form.email.placeholder")}
          />
        </div>

        <div className={style.contact__message}>
          <label className="form-control-label" htmlFor="contactMessageInput">
            {t("form.message.label")}
          </label>
          <textarea
            className="form-control"
            id="contactMessageInput"
            rows={4}
            placeholder={t("form.message.placeholder")}
          />
        </div>

        <button className="form-control">{t("form.submit")}</button>
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
