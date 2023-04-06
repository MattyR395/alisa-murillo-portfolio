import { navLinks } from "@/constants/nav-links";
import clsx from "clsx";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { memo } from "react";
import style from "./HamburgerMenu.module.scss";

function HamburgerMenu(props: {
  isOpen: boolean;
  headerHeightPx: number;
}): JSX.Element {
  const { t } = useTranslation("common");

  return (
    <div
      className={clsx({
        [style["hamburger-menu"]]: true,
        [style["is-open"]]: props.isOpen,
      })}
      style={{
        paddingBlock: `${props.headerHeightPx}px`,
      }}
    >
      <ul>
        {Object.values(navLinks).map((link) => (
          <li key={link.path}>
            <Link href={link.path}>{t(link.label)}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default memo(HamburgerMenu);
