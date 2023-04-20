import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import style from "./PortfolioCard.module.scss";

export default function PortfolioCard(props: {
  title: string;
  imagePath: string;
  uri: string;
}): JSX.Element {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleOnLoad = () => {
    setIsLoaded(true);
  };

  return (
    <Link
      className={clsx({
        [style["portfolio-card"]]: true,
        [style["portfolio-card--loaded"]]: isLoaded,
      })}
      href={`portfolio/${props.uri}`}
    >
      <div className={style["portfolio-card__image"]}>
        <Image
          src={props.imagePath}
          alt={props.title}
          width={400}
          height={400}
          onLoad={handleOnLoad}
        ></Image>
      </div>

      <div className={style["portfolio-card__title"]}>{props.title}</div>
    </Link>
  );
}
