import { clsx } from "clsx";
import useTranslation from "next-translate/useTranslation";
import style from "./HamburgerButton.module.scss";

export default function HamburgerButton(props: {
  onClick: () => void;
  isActivated: boolean;
  ariaControlsId: string;
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
      aria-expanded={props.isActivated}
      aria-controls={props.ariaControlsId}
    >
      <span className={style.hamburger__bars}>
        <span></span>
      </span>
      {t("header.menu")}
    </button>
  );
}
