"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaInstagram, FaLinkedin, FaFacebook, FaTiktok } from "react-icons/fa6";
import arrow from "@/public/images/pin.png";
import office from "@/public/images/location.png";
import phone from "@/public/images/phone (1).png";
import email from "@/public/images/email.png";
import insta from "@/public/images/instagram.png";
import linkedin from "@/public/images/linkedin.png";
import fb from "@/public/images/facebook.png";
import tiktok from "@/public/images/tiktok.png";

const Footer: React.FC = () => {
  return (
    <footer className="footer mt-auto py-4 shadow text-white">
      {/* Use fixed width container to align with navbar */}
      <Container className="">
        <Row className="justify-content-between align-items-start g-4">
          {/* Company Info */}
          <Col md={4}>
            <h5 className="fw-bold mb-3">Keep in touch</h5>
            <p className="mb-2">
              {" "}
              <Image
                src={arrow}
                alt="Logo Large"
                width={23}
                height={23}
                priority
              />{" "}
              <a
                href="https://www.google.com/maps?q=Salmiya,+Salem+Al+Mubarak+St.+Block+4,+Omniya+Centre+-+G+Floor+-+Office+8"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                Salmiya, Salem Al Mubarak St.
              </a>
            </p>
            <p className="mb-2">
              {" "}
              <Image
                src={office}
                alt="Logo Large"
                width={23}
                height={23}
                priority
                // className="d-none d-lg-inline" // Show only on large screens and up
              />{" "}
              Omniya Centre - G Floor - Office 8
            </p>
            <p className="mb-2">
              {" "}
              <Image
                src={phone}
                alt="Logo Large"
                width={23}
                height={23}
                priority
                // className="d-none d-lg-inline" // Show only on large screens and up
              />{" "}
              <a href="tel:+96525713432" className="footer-link">
                +965 2571 3432
              </a>
            </p>
            <p className="mb-0">
              {" "}
              <Image
                src={email}
                alt="Logo Large"
                width={23}
                height={23}
                priority
              />{" "}
              <a href="mailto:info@leaptechkw.com" className="footer-link">
                info@leaptechkw.com
              </a>
            </p>
          </Col>

          {/* Site Links */}
          <Col md={2}>
            <h6 className="fw-semibold mb-3">Site Links</h6>
            <ul className="list-unstyled">
              <li>
                <Link href="/" legacyBehavior>
                  <a className="footer-link">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/about" legacyBehavior>
                  <a className="footer-link"> About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/service" legacyBehavior>
                  <a className="footer-link">Service</a>
                </Link>
              </li>
              <li>
                <Link href="/contact" legacyBehavior>
                  <a className="footer-link"> Contact Us</a>
                </Link>
              </li>
            </ul>
          </Col>

          {/* Inner Links (Web App, Marketing, Career) */}
          <Col md={2}>
            <h6 className="fw-semibold mb-3">Inner Links</h6>
            <ul className="list-unstyled">
              <li>
                <Link href="/web" legacyBehavior>
                  <a className="footer-link">Web</a>
                </Link>
              </li>
              <li>
                <Link href="/mobileApp" legacyBehavior>
                  <a className="footer-link"> Mobile Application</a>
                </Link>
              </li>
              <li>
                <Link href="/socialMedia" legacyBehavior>
                  <a className="footer-link"> Social Media</a>
                </Link>
              </li>
              <li>
                <Link href="/career" legacyBehavior>
                  <a className="footer-link">career</a>
                </Link>
              </li>
            </ul>
          </Col>

          {/* Newsletter + Socials */}
          <Col md={4}>
            {/* Socials */}
            <div className="mt-4 d-flex gap-3">
              <a
                href="https://www.tiktok.com/@leaptechkw?_t=ZS-8yCvz1g4UIU&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-icon"
              >
                {" "}
                <Image
                  src={tiktok}
                  alt="Logo Large"
                  width={23}
                  height={23}
                  priority
                />{" "}
              </a>
              <a
                href="https://www.instagram.com/leaptechkw?igsh=enp4anBubjJ4YWVv"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-icon"
              >
                {" "}
                <Image
                  src={insta}
                  alt="Logo Large"
                  width={23}
                  height={23}
                  priority
                />{" "}
              </a>
              <a
                href="https://www.linkedin.com/company/leap-tech-kw"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-icon"
              >
                {" "}
                <Image
                  src={linkedin}
                  alt="Logo Large"
                  width={23}
                  height={23}
                  priority
                />{" "}
              </a>
              <a
                href="https://www.facebook.com/share/1TbEaveqqE/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-icon"
              >
     {" "}
                <Image
                  src={fb}
                  alt="Logo Large"
                  width={23}
                  height={23}
                  priority
                />{" "}              </a>
            </div>
          </Col>
        </Row>
      </Container>

      {/* 🔥 Animated Gradient Divider */}
      <div className="footer-divider-wrapper">
        <div className="footer-divider-line" />
      </div>

      {/* Copyright */}
      <div className="text-center mt-4 pt-3 ">
        <small className="fw-medium">
          © {new Date().getFullYear()} Leap Tech KW. All Rights Reserved.
        </small>
      </div>

      <style jsx>{`
        .footer {
          background: linear-gradient(90deg, #0b1f3a, #1e3d6b);
          color: #fff;
          position: relative;
          z-index: 1;
        }
        .shadow {
          box-shadow: 5px -1rem 1rem rgba(0, 0, 0, 0.15) !important;
        }
        .footer-link {
          color: #ddd;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-link:hover {
          color: #ffffff;
          text-decoration: underline;
        }

        .footer-icon {
          font-size: 1.4rem;
          color: #ffffff;
          transition: transform 0.3s ease, color 0.3s ease;
        }

        .footer-icon:hover {
          color: #00d4ff;
          transform: scale(1.15);
        }

        .footer-divider-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 30px;
          margin-top: 2rem;
        }

        .footer-divider-line {
          width: 50%;
          height: 4px;
          border-radius: 4px;
          background: linear-gradient(
            90deg,
            #003366 0%,
            white 50%,
            #003366 100%
          );
          animation: pulse-line 2.8s ease-in-out infinite;
        }

        @keyframes pulse-line {
          0%,
          100% {
            transform: scaleX(0.3);
            opacity: 0.4;
          }
          50% {
            transform: scaleX(1);
            opacity: 1;
          }
        }

        .footer-email-input {
          border-radius: 0;
          border: 1px solid #0061ff;
          padding: 0.5rem 1rem;
          font-size: 1rem;
          color: #000;
          background-color: #fff;
          transition: border-color 0.3s ease;
        }

        .footer-email-input:focus {
          border-color: #00d4ff;
          outline: none;
          box-shadow: 0 0 5px #00d4ff;
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
          background-color: white !important;
          color: #003366 !important;
        }

        .footer-subscribe-btn:hover {
          background: linear-gradient(90deg, #004bb5, #0099ff);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
