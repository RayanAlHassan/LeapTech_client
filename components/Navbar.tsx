// components/Navbar.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/logoLeapTech.png";

const NAVBAR_BG = "#19335d";
const TEXT_COLOR = "#ffffff";

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
        backgroundColor: NAVBAR_BG,
        transition: "transform 0.3s ease",
      }}
    >
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <Link href="/" legacyBehavior>
          <a
            className="navbar-brand d-flex align-items-center"
            style={{ color: TEXT_COLOR }}
          >
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

        <div className="d-none d-lg-flex gap-3 fw-medium">
          <Link href="/" legacyBehavior>
            <a className="nav-link" style={{ color: TEXT_COLOR }}>
              HOME
            </a>
          </Link>
          <Link href="/about" legacyBehavior>
            <a className="nav-link" style={{ color: TEXT_COLOR }}>
              ABOUT US
            </a>
          </Link>
          <Link href="/services" legacyBehavior>
            <a className="nav-link" style={{ color: TEXT_COLOR }}>
              OUR SERVICES
            </a>
          </Link>
          <Link href="/career" legacyBehavior>
            <a className="nav-link" style={{ color: TEXT_COLOR }}>
              CAREER
            </a>
          </Link>
        </div>

        <Link href="/contact" legacyBehavior>
          <a className="d-none d-lg-block">
            <button
              className="btn btn-light px-4 py-2"
              style={{ color: NAVBAR_BG }}
            >
              CONTACT US
            </button>
          </a>
        </Link>

        <button
          className="btn d-lg-none border-0"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          style={{ color: TEXT_COLOR }}
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

      {isMenuOpen && (
        <div
          className="bg-white shadow-lg mt-2 p-3 d-lg-none w-100"
          style={{ color: NAVBAR_BG }}
        >
          <Link href="/" legacyBehavior>
            <a
              onClick={toggleMenu}
              className="d-block py-2 text-decoration-none"
              style={{ color: NAVBAR_BG }}
            >
              HOME
            </a>
          </Link>
          <Link href="/about" legacyBehavior>
            <a
              onClick={toggleMenu}
              className="d-block py-2 text-decoration-none"
              style={{ color: NAVBAR_BG }}
            >
              ABOUT US
            </a>
          </Link>
          <Link href="/services" legacyBehavior>
            <a
              onClick={toggleMenu}
              className="d-block py-2 text-decoration-none"
              style={{ color: NAVBAR_BG }}
            >
              OUR SERVICES
            </a>
          </Link>
          <Link href="/career" legacyBehavior>
            <a
              onClick={toggleMenu}
              className="d-block py-2 text-decoration-none"
              style={{ color: NAVBAR_BG }}
            >
              CAREER
            </a>
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
          color: #19335d !important;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
