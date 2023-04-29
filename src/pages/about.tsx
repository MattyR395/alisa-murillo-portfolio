import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import style from "./About.module.scss";

export default function About(): JSX.Element {
  const { t } = useTranslation("about");

  return (
    <div className={style.about}>
      <div className={style.about__image}>
        <Image
          src="https://media.licdn.com/dms/image/C4D03AQFU7yG56dSwZg/profile-displayphoto-shrink_800_800/0/1641414746614?e=2147483647&v=beta&t=1mEuZTVborKkRIFlA_DpKm88K18x8H-e4Ht5WJYcp28"
          alt="Placeholder"
          width={1000}
          height={1250}
        />
      </div>

      <div>
        <h1>{t("header")}</h1>

        <p>{t("p1")}</p>
      </div>
    </div>
  );
}
