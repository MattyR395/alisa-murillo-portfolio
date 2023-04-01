import { clsx } from "clsx";
import useTranslation from "next-translate/useTranslation";
import style from "./HamburgerButton.module.scss";

export default function HamburgerButton(props: {
  onClick: () => void;
  isActivated: boolean;
}): JSX.Element {
  const { t } = useTranslation("common");
  const { onClick, isActivated = false } = props;

  return (
    <button
      onClick={onClick}
      className={clsx({
        [style["is-open"]]: isActivated,
        [style.hamburger]: true,
      })}
    >
      <div className={style.hamburger__bars}>
        <div></div>
      </div>
      {t("header.menu")}
    </button>
  );
}
