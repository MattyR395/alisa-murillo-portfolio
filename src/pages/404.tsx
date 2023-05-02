import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import style from "./404.module.scss";

export default function PageNotFound(): JSX.Element {
  const { t } = useTranslation("common");
  return (
    <>
      <Head>
        <title>
          {t("docTitle", {
            title: t("404.header"),
          })}
        </title>
      </Head>
      <div className={style["page-not-found"]}>
        <h1>{t("404.header")}</h1>
        <p>{t("404.description")}</p>
      </div>
    </>
  );
}
