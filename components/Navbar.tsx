"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/logoLeapTech.png";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current && window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav
      className={`navbar fixed-top shadow px-4 py-3 ${
        isVisible ? "translate-none" : "translate-up"
      }`}
      style={{
        backgroundColor: "var(--navbar-bg)",
        transition: "transform 0.3s ease",
      }}
    >
      <div className="container d-flex align-items-center justify-content-between">
        {/* Left: Logo */}
        <div style={{ paddingLeft: "15px" }}>
          <Link href="/" legacyBehavior>
            <a className="navbar-brand d-flex align-items-center">
              <Image
                src={logo}
                alt="Logo"
                height={64}
                width={64}
                quality={100}
                priority
              />
            </a>
          </Link>
        </div>

        {/* Center: Nav Links */}
        <div className="d-none d-lg-flex gap-5 fw-medium mx-auto">
          <Link href="/" legacyBehavior>
            <a className="nav-link">HOME</a>
          </Link>
          <Link href="/about" legacyBehavior>
            <a className="nav-link">ABOUT US</a>
          </Link>
          <Link href="/services" legacyBehavior>
            <a className="nav-link">SERVICE</a>
          </Link>
          <Link href="/contact" legacyBehavior>
            <a className="nav-link">CONTACT US</a>
          </Link>
        </div>

        {/* Right: Language Switch + Career Button */}
        <div className="d-none d-lg-flex align-items-center  gap-3">
          {/* Language Switcher */}
          <button
            type="button"
            className="language-switch d-flex align-items-center btn btn-link p-0"
            onClick={() => alert("Switch to Arabic")}
            aria-label="Switch language to Arabic"
          >
            اللغة العربية
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20" />
              <path d="M12 2a15 15 0 0 1 0 20" />
              <path d="M7 4a15 15 0 0 1 0 16" />
              <path d="M17 4a15 15 0 0 0 0 16" />
            </svg>
          </button>

          {/* Career Button */}
          <Link href="/career" legacyBehavior>
            <a>
              <button
                className="btn btn-light px-4 py-2"
                style={{ color: "var(--navbar-bg)" }}
              >
                CAREER
              </button>
            </a>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="btn d-lg-none border-0"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          style={{ color: "var(--text-color)" }}
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            className="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2.5 12.5a.5.5 0 010-1h11a.5.5 0 010 1h-11zm0-4a.5.5 0 010-1h11a.5.5 0 010 1h-11zm0-4a.5.5 0 010-1h11a.5.5 0 010 1h-11z"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div
          className="bg-white shadow-lg mt-2 p-3 d-lg-none w-100"
          style={{ color: "var(--navbar-bg)" }}
        >
          <Link href="/" legacyBehavior>
            <a onClick={toggleMenu} className="d-block py-2">HOME</a>
          </Link>
          <Link href="/about" legacyBehavior>
            <a onClick={toggleMenu} className="d-block py-2">ABOUT US</a>
          </Link>
          <Link href="/services" legacyBehavior>
            <a onClick={toggleMenu} className="d-block py-2">OUR SERVICES</a>
          </Link>
          <Link href="/career" legacyBehavior>
            <a onClick={toggleMenu} className="d-block py-2">CAREER</a>
          </Link>
          <Link href="/contact" legacyBehavior>
            <a onClick={toggleMenu} className="d-block pt-3">
              <button className="btn btn-primary w-100">CONTACT US</button>
            </a>
          </Link>
        </div>
      )}

      <style jsx>{`
        .translate-none {
          transform: translateY(0);
        }
        .translate-up {
          transform: translateY(-100%);
        }
        .nav-link {
          color: var(--text-color);
          text-decoration: none;
          border-bottom: 2px solid transparent;
          transition: border-color 0.3s, color 0.3s;
        }
        .nav-link:hover,
        .nav-link:focus {
          color: white !important;
          border-bottom-color: white !important;
        }
        button.btn-light:hover {
          background-color: #e0e7ff;
          color: var(--navbar-bg) !important;
        }

        /* Language Switcher */
        .language-switch {
          color: white;
          text-decoration: none;
          font-weight: 500;
          font-size: 1rem;
        }
        .language-switch:hover {
          text-decoration: underline;
          text-underline-offset: 3px;
          color: white;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
