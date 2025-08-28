
"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import arrow from "@/public/images/pin.png";
import office from "@/public/images/location.png";
import phone from "@/public/images/phone (1).png";
import email from "@/public/images/email.png";
import insta from "@/public/images/instagram.png";
import linkedin from "@/public/images/linkedin.png";
import fb from "@/public/images/facebook.png";
import tiktok from "@/public/images/tiktok.png";
import axios from "axios";

interface Category {
  _id: string;
  title: string;
}

const Footer: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/category`) // your endpoint for fetching categories
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Failed to fetch categories", err));
  }, []);

  return (
    <footer className="footer mt-auto py-4 shadow text-white">
      <Container>
        <Row className="justify-content-between align-items-start g-4">
          {/* Company Info */}
          <Col md={4}>
            <h5 className="fw-bold mb-3">Keep in touch</h5>
            <p className="mb-2">
              <Image src={arrow} alt="Arrow" width={23} height={23} />{" "}
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
              <Image src={office} alt="Office" width={23} height={23} /> Omniya Centre - G Floor - Office 8
            </p>
            <p className="mb-2">
              <Image src={phone} alt="Phone" width={23} height={23} />{" "}
              <a href="tel:+96525713432" className="footer-link">
                +965 2571 3432
              </a>
            </p>
            <p className="mb-0">
              <Image src={email} alt="Email" width={23} height={23} />{" "}
              <a href="mailto:info@leaptechkw.com" className="footer-link">
                info@leaptechkw.com
              </a>
            </p>
          </Col>

          {/* Site Links (with Career included) */}
          <Col md={2}>
            <h6 className="fw-semibold mb-3">Site Links</h6>
            <ul className="list-unstyled">
              <li>
                <Link href="/" legacyBehavior>
                  <a className="footer-link">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/AboutUs" legacyBehavior>
                  <a className="footer-link">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/services" legacyBehavior>
                  <a className="footer-link">Service</a>
                </Link>
              </li>
              <li>
                <Link href="/ContactUs" legacyBehavior>
                  <a className="footer-link">Contact Us</a>
                </Link>
              </li>
              <li>
                <Link href="/career" legacyBehavior>
                  <a className="footer-link">Career</a>
                </Link>
              </li>
            </ul>
          </Col>

          {/* Inner Links (dynamically fetched categories) */}
          <Col md={2}>
            <h6 className="fw-semibold mb-3">Inner Links</h6>
            <ul className="list-unstyled">
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <li key={cat._id}>
                    <Link href={`/services/category/${cat._id}`} legacyBehavior>
                      <a className="footer-link">{cat.title}</a>
                    </Link>
                  </li>
                ))
              ) : (
                <li>Loading...</li>
              )}
            </ul>
          </Col>

          {/* Socials */}
          <Col md={4}>
            <div className="mt-4 d-flex gap-3">
              <a href="https://www.tiktok.com/@leaptechkw" target="_blank" rel="noopener noreferrer" className="footer-icon">
                <Image src={tiktok} alt="TikTok" width={23} height={23} />
              </a>
              <a href="https://www.instagram.com/leaptechkw" target="_blank" rel="noopener noreferrer" className="footer-icon">
                <Image src={insta} alt="Instagram" width={23} height={23} />
              </a>
              <a href="https://www.linkedin.com/company/leap-tech-kw" target="_blank" rel="noopener noreferrer" className="footer-icon">
                <Image src={linkedin} alt="LinkedIn" width={23} height={23} />
              </a>
              <a href="https://www.facebook.com/share/1TbEaveqqE" target="_blank" rel="noopener noreferrer" className="footer-icon">
                <Image src={fb} alt="Facebook" width={23} height={23} />
              </a>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Divider */}
      <div className="footer-divider-wrapper">
        <div className="footer-divider-line" />
      </div>

      {/* Copyright */}
      <div className="text-center mt-4 pt-3">
        <small className="fw-medium">© {new Date().getFullYear()} Leap Tech KW. All Rights Reserved.</small>
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
          background: linear-gradient(90deg, #003366 0%, white 50%, #003366 100%);
          animation: pulse-line 2.8s ease-in-out infinite;
        }
        @keyframes pulse-line {
          0%, 100% { transform: scaleX(0.3); opacity: 0.4; }
          50% { transform: scaleX(1); opacity: 1; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
