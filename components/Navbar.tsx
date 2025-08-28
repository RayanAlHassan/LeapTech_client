"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import logo from "@/public/images/logonew.png";
import PrimaryButton from "./ui/PrimaryButton";
import Animatedburger from "./ui/AnimatedHamburger";
import en from "@/public/locales/en.json"; // English texts
import ar from "@/public/locales/ar.json"; // Arabic texts

interface NavbarProps {
  onHeightChange: (height: number) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onHeightChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [language, setLanguage] = useState<"🇬🇧" | "🇰🇼">("🇬🇧");
  const pathname = usePathname();
  const lastScrollY = useRef(0);
  const navRef = useRef<HTMLElement>(null);
  const [navHeight, setNavHeight] = useState(0);

  // Toggle menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Toggle language
  const toggleLanguage = () => {
    setLanguage(prev => (prev === "🇬🇧" ? "🇰🇼" : "🇬🇧"));
  };

  // Choose JSON based on language
  const t = language === "🇬🇧" ? en : ar;

  // Update nav height
  useEffect(() => {
    const updateHeight = () => {
      if (navRef.current) {
        setNavHeight(navRef.current.offsetHeight);
        onHeightChange(navRef.current.offsetHeight);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [onHeightChange]);

  // Show/hide navbar on scroll
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout | null = null;
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current && window.scrollY > 100) {
        setIsVisible(false);
      }
      lastScrollY.current = window.scrollY;
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setIsVisible(true), 150);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className={`navbar fixed-top shadow px-4 py-3 ${
        isVisible ? "translate-none" : "translate-up"
      }`}
      style={{
        backgroundColor: "#003366",
        transition: "transform 0.3s ease",
        height: "10vh",
        zIndex: 1030,
      }}
    >
      <div className="container d-flex align-items-center justify-content-between w-100 h-100">
        {/* Logo */}
        <div className="d-flex align-items-center h-100">
          <Link href="/" legacyBehavior>
            <a className="navbar-brand d-flex align-items-center">
              <Image src={logo} alt="Logo" width={100} quality={100} priority />
            </a>
          </Link>
        </div>

        {/* Desktop nav */}
        <div className="d-none d-lg-flex gap-5 fw-medium" style={{ flex: 1, justifyContent: "center" }}>
          <Link href="/" legacyBehavior>
            <a className={`nav-link underline-anim ${pathname === "/" ? "active" : ""}`}>
              {t.navbar.home}
            </a>
          </Link>
          <Link href="/AboutUs" legacyBehavior>
            <a className={`nav-link underline-anim ${pathname === "/AboutUs" ? "active" : ""}`}>
              {t.navbar.aboutUs}
            </a>
          </Link>
          <Link href="/services" legacyBehavior>
            <a className={`nav-link underline-anim ${pathname === "/services" ? "active" : ""}`}>
              {t.navbar.services}
            </a>
          </Link>
          <Link href="/ContactUs" legacyBehavior>
            <a className={`nav-link underline-anim ${pathname === "/ContactUs" ? "active" : ""}`}>
              {t.navbar.contactUs}
            </a>
          </Link>
        </div>

        {/* Desktop buttons */}
        <div className="d-none d-lg-flex align-items-center gap-3">
          <Link href="/career">
            <button className={`btn lang-toggle-btn px-4 ${pathname === "/career" ? "active-career" : ""}`}>
              {t.navbar.career}
            </button>
          </Link>
          <button onClick={toggleLanguage} className="lang-toggle-btn fw-semibold" aria-label="Toggle language">
            {language}
          </button>
        </div>

        {/* Mobile hamburger */}
        <div className="d-flex d-lg-none align-items-center gap-2 ms-auto">
          <Animatedburger isOpen={isMenuOpen} toggle={toggleMenu} />
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div
          className="d-lg-none position-fixed w-100 start-0 mobile-menu-animated"
          style={{
            top: `${navHeight}px`,
            background: "linear-gradient(to left, #ffffff, #f0f4f8)",
            zIndex: 1029,
            padding: "2rem 1rem",
            borderBottomLeftRadius: "12px",
            borderBottomRightRadius: "12px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          }}
        >
          <div className="d-flex flex-column align-items-center gap-4">
            <Link href="/" legacyBehavior>
              <a onClick={toggleMenu} className="text-primary fw-semibold fs-5">{t.navbar.home}</a>
            </Link>
            <Link href="/AboutUs" legacyBehavior>
              <a onClick={toggleMenu} className="text-primary fw-semibold fs-5">{t.navbar.aboutUs}</a>
            </Link>
            <Link href="/services" legacyBehavior>
              <a onClick={toggleMenu} className="text-primary fw-semibold fs-5">{t.navbar.services}</a>
            </Link>
            <Link href="/ContactUs" legacyBehavior>
              <a onClick={toggleMenu} className="text-primary fw-semibold fs-5">{t.navbar.contactUs}</a>
            </Link>
            <button onClick={toggleLanguage} className="primary-button">{language}</button>
            <Link href="/career" legacyBehavior>
              <a>
                <PrimaryButton className={pathname === "/career" ? "active-career" : ""}>
                  {t.navbar.career}
                </PrimaryButton>
              </a>
            </Link>
          </div>
        </div>
      )}

      {/* STYLES */}
      <style jsx>{`
        .navbar {
          height: 74px; /* match large logo height */
          transition: transform 0.5s ease, opacity 0.5s ease !important;
        }
        box-shadow: 2px 1rem 1rem rgba(0, 0, 0, 0.15) !important;
      }
        .translate-up {
          transform: translateY(-100%);
          opacity: 0;
        }

        .main-section {
          padding-top: 80px; /* to avoid overlap */
        }

        .career-button {
          position: relative;
          background-color: white;
          border: 1px solid white;
          color: #003366;
          font-weight: 500;
          cursor: pointer;
          overflow: hidden;
          transition: color 0.6s ease;
          z-index: 0;
        }

        .career-button::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            #003366 0%,
            white 50%,
            #003366 100%
          );
          background-size: 200% 100%;
          background-position: 100% 0;
          transition: background-position 0.6s ease;
          z-index: -1;
          border-radius: inherit;
          opacity: 0;
        }

        .career-button:hover::before {
          opacity: 1;
          background-position: 0 0;
        }

        .career-button:hover {
          color: var(--navbar-bg);
        }

        .d-lg-none a {
          color: var(--navbar-bg) !important;
          text-decoration: none;
        }

        .translate-none {
          transform: translateY(0);
          opacity: 1;
        }

        .translate-up {
          transform: translateY(-100%);
          opacity: 0;
        }

        .nav-link {
          font-weight: 800;
          padding: 6px 12px;
          line-height: 1.5;
          color: white;
          text-decoration: none;
          position: relative;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          height: 40px;
        }
        .underline-anim {
          position: relative;
          display: inline-block;
          color: white;
        }

        .underline-anim::after {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 50%;
          width: 80px;
          height: 4px;
          background: linear-gradient(
            90deg,
            #ffffff 0%,
            rgba(255, 255, 255, 0.5) 50%,
            #ffffff 100%
          );
          border-radius: 10px;
          transform: translateX(-50%) scaleX(0);
          transform-origin: center;
          transition: transform 0.4s ease;
        }

        .underline-anim:hover::after {
          transform: translateX(-50%) scaleX(1);
        }

        .language-switch {
          background: none;
          border: none;
          cursor: pointer;
          color: white;
          font-weight: 500;
          position: relative;
          padding-bottom: 4px;
          display: flex;
          align-items: center;
          text-decoration: none;
        }

        @keyframes fadeSlideDown {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .mobile-menu-animated {
          animation: fadeSlideDown 0.5s ease forwards;
        }
        .lang-toggle-btn {
          background-color: #003366;
          color: white;
          border: 1px solid white;
          border-radius: 6px;
          padding: 6px 16px;
          transition: all 0.3s ease;
        }

        .lang-toggle-btn:hover {
          background-color: white;
          color: #003366;
        }
        /* Button same size as hamburger */
        .lang-icon-btn {
          width: 32px;
          height: 32px;
          background-color: transparent;
          border: 1px solid white;
          color: white;
          font-weight: 600;
          font-size: 12px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .lang-icon-btn:hover {
          background-color: white;
          color: #003366;
        }
        /* Active state */
        .lang-toggle-btn.active-career {
          background-color: white;
          color: var(--navbar-bg);
          border: 1px solid white;
          pointer-events: none; /* Optional: disables click on already active */
        }
        /* Keep underline visible on active page link */
        .underline-anim.active::after {
          transform: translateX(-50%) scaleX(1);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
