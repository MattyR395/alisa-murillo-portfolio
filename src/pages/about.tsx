import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import Image from "next/image";
import profile from "../../public/profile.webp";
import style from "./About.module.scss";

export default function About(): JSX.Element {
  const { t } = useTranslation("about");

  return (
    <>
      <Head>
        <title>
          {t("common:docTitle", {
            title: t("common:header.about"),
          })}
        </title>
        <meta name="description" content={t("p1")} />
      </Head>

      <div className={style.about}>
        <div className={style.about__image}>
          <Image src={profile} alt={t("profileAlt")} />
        </div>

        <div>
          <h1>{t("header")}</h1>

          <p>{t("p1")}</p>
        </div>
      </div>
    </>
  );
}
