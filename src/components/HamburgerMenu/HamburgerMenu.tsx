import { navLinks } from "@/constants/nav-links";
import clsx from "clsx";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { memo } from "react";
import style from "./HamburgerMenu.module.scss";

function HamburgerMenu(props: {
  isOpen: boolean;
  headerHeightPx: number;
  id: string;
}): JSX.Element {
  const { t } = useTranslation("common");

  return (
    <nav
      className={clsx({
        [style["hamburger-menu"]]: true,
        [style["is-open"]]: props.isOpen,
      })}
      style={{
        paddingBlock: `${props.headerHeightPx}px`,
      }}
      role="menu"
      aria-expanded={props.isOpen}
      id={props.id}
    >
      <ul>
        {Object.values(navLinks).map((link) => (
          <li key={link.path}>
            <Link href={link.path}>{t(link.label)}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default memo(HamburgerMenu);
