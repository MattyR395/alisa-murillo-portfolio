import useTranslation from "next-translate/useTranslation";
import style from "./404.module.scss";

export default function PageNotFound(): JSX.Element {
  const { t } = useTranslation("common");
  return (
    <div className={style["page-not-found"]}>
      <h1>{t("404.header")}</h1>
      <p>{t("404.description")}</p>
    </div>
  );
}
