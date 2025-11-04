"use client";
import { useState, useEffect } from "react";
import styles from "./styles/Header.module.css";
import Image from "next/image";
import { LOGO_DARK_TRANSPARENT } from "@/assets/images";

interface NavigationLink {
  name: string;
  href: string;
}

const Header = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeLink, setActiveLink] = useState<string>("home");

  const navigationLinks: NavigationLink[] = [
    { name: "Home", href: "#home" },
    { name: "Works", href: "#works" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  const handleLinkClick = (href: string, name: string): void => {
    setActiveLink(name.toLowerCase());
  };

  return (
    <div>
      {/* {isLoading && <Loading />} */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <Image
              src={LOGO_DARK_TRANSPARENT}
              alt="Logo de ONE Xtudio"
              priority
            />
          </div>

          <nav className={styles.nav}>
            {navigationLinks.map((link: NavigationLink) => (
              <a
                key={link.name}
                href={link.href}
                className={`${styles.navLink} ${
                  activeLink === link.name.toLowerCase() ? styles.active : ""
                }`}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  handleLinkClick(link.href, link.name);
                  const target = document.querySelector(link.href);
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
