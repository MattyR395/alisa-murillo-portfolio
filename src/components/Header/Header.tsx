import { navLinks } from "@/constants/nav-links";
import { useAppStore } from "@/store/store";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import clsx from "clsx";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo, useEffect, useRef, useState } from "react";
import AdminHeader from "../AdminHeader/AdminHeader";
import HamburgerButton from "../HamburgerButton/HamburgerButton";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import Logo from "../Logo/Logo";
import style from "./Header.module.scss";

export default function Header(): JSX.Element {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isBodyScrolled, setIsBodyScrolled] = useState(false);
  const { isMobileMenuOpen, toggleMobileMenu } = useAppStore((state) => state);
  const { session, isLoading: isSessionLoading } = useSessionContext();

  const headerHeightRef = useRef<HTMLDivElement>(null);

  /**
   * Determines the page has been scrolled away from the top.
   * If so, the header will be put in "compact" mode.
   */
  const handleBodyScroll = () => {
    setIsBodyScrolled(window.scrollY > 50);
  };

  const handleHamburgerClick = () => {
    toggleMobileMenu();
  };

  useEffect(() => {
    setHeaderHeight(headerHeightRef.current!.clientHeight);
    handleBodyScroll();

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
      <HamburgerMenu
        isOpen={isMobileMenuOpen}
        headerHeightPx={headerHeight}
        id="hamburger-menu"
      />

      <div>
        {!isSessionLoading && session && <AdminHeader />}

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
          <Nav
            handleHamburgerClick={handleHamburgerClick}
            isMobileMenuOpen={isMobileMenuOpen}
          />
        </header>
      </div>
    </>
  );
}

const Nav = memo(
  (props: { handleHamburgerClick: () => void; isMobileMenuOpen: boolean }) => {
    const router = useRouter();
    const { t } = useTranslation("common");

    return (
      <nav className={style.header__nav}>
        <Link
          href={navLinks.about.path}
          className={clsx({
            [style.link]: true,
            [style["is-active"]]: router.pathname === navLinks.about.path,
          })}
        >
          {t(navLinks.about.label)}
        </Link>

        <Logo
          href={navLinks.portfolio.path}
          title={t(navLinks.portfolio.label)}
          aria-label={t(navLinks.portfolio.label)}
        />

        <Link
          href={navLinks.contact.path}
          className={clsx({
            [style.link]: true,
            [style.right]: true,
            [style["is-active"]]: router.pathname === navLinks.contact.path,
          })}
        >
          {t(navLinks.contact.label)}
        </Link>

        <span className={style["hide-lg"]}>
          <HamburgerButton
            onClick={props.handleHamburgerClick}
            isActivated={props.isMobileMenuOpen}
            ariaControlsId="hamburger-menu"
          />
        </span>
      </nav>
    );
  }
);

Nav.displayName = "Nav";
