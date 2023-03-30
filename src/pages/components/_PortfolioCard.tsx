import Image from "next/image";
import Link from "next/link";
import style from "./PortfolioCard.module.scss";

export default function PortfolioCard(props: {
  title: string;
  imagePath: string;
  uri: string;
}): JSX.Element {
  return (
    <Link className={style["portfolio-card"]} href={`portfolio/${props.uri}`}>
      <Image
        className={style["portfolio-card__image"]}
        src={props.imagePath}
        alt={props.title}
        width={400}
        height={400}
      ></Image>

      <div className={style["portfolio-card__title"]}>{props.title}</div>
    </Link>
  );
}
