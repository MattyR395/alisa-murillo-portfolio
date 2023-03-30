import clsx from "clsx";
import Link from "next/link";
import style from "./HamburgerMenu.module.scss";

export default function HamburgerMenu(props: {
  isOpen: boolean;
  headerHeightPx: number;
}): JSX.Element {
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
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </div>
  );
}
