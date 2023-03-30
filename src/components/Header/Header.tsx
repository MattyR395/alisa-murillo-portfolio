import { useAppStore } from "@/store/store";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import HamburgerButton from "../HamburgerButton/HamburgerButton";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import Logo from "../Logo/Logo";
import style from "./Header.module.scss";

export default function Header(): JSX.Element {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isBodyScrolled, setIsBodyScrolled] = useState(false);
  const { isMobileMenuOpen, toggleMobileMenu } = useAppStore((state) => state);

  const headerHeightRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  /**
   * Determines the page has been scrolled away from the top.
   * If so, the header will be put in "compact" mode.
   */
  const checkIsBodyScrolled = () => {
    setIsBodyScrolled(window.scrollY > 50);
  };

  const handleBodyScroll = useCallback(() => {
    checkIsBodyScrolled();
  }, []);

  const handleHamburgerClick = () => {
    toggleMobileMenu();
  };

  useEffect(() => {
    setHeaderHeight(headerHeightRef.current!.clientHeight);
    checkIsBodyScrolled();

    window.addEventListener("scroll", handleBodyScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleBodyScroll);
    };
  }, []);

  // Disable body scroll when mobile menu is open.
  useEffect(() => {
    if (isMobileMenuOpen) {
      disableBodyScroll(document.body);
    } else {
      enableBodyScroll(document.body);
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <HamburgerMenu isOpen={isMobileMenuOpen} headerHeightPx={headerHeight} />

      <div>
        <div
          style={{
            height: `${headerHeight}px`,
          }}
        ></div>

        <header
          className={clsx({
            [style.header]: true,
            [style["is-compact"]]: isBodyScrolled && !isMobileMenuOpen,
          })}
          ref={headerHeightRef}
        >
          <nav className={style.header__nav}>
            <Link
              href="/about"
              className={clsx({
                [style.link]: true,
                [style["is-active"]]: router.pathname === "/about",
              })}
            >
              About
            </Link>

            <Logo href="/" />

            <Link
              href="/contact"
              className={clsx({
                [style.link]: true,
                [style.right]: true,
                [style["is-active"]]: router.pathname === "/contact",
              })}
            >
              Contact
            </Link>

            <span className={style["hide-lg"]}>
              <HamburgerButton
                onClick={handleHamburgerClick}
                isActivated={isMobileMenuOpen}
              />
            </span>
          </nav>
        </header>
      </div>
    </>
  );
}
