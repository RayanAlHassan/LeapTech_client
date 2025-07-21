"use client";

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import PrimaryButton from "../components/ui/PrimaryButton";
import Link from "next/link";
import Lottie from "lottie-react";
import comingSoon from "../public/animations/comingSoon.json"

const ComingSoon: React.FC = () => {
  return (
    <section
      className="coming-soon-section d-flex align-items-center justify-content-center text-white text-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--navbar-bg)",
        padding: "2rem",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
          <Lottie animationData={comingSoon} loop className="lottie-vision" />

          <h1 className="display-4 fw-bold mb-4 coming-title">Coming Soon</h1>
            <p className="lead mb-4">
              This page is currently under development. We’ll be launching it soon — stay tuned!
            </p>
            <Link href={"/"}>
            <PrimaryButton >Back To Home</PrimaryButton>

            </Link>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
  .hover-underline {
    display: inline-block;
    position: relative;
    cursor: pointer;
  }

  .hover-underline::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 2px;
    width: 0%;
    background: linear-gradient(
      90deg,
      #ffffff 0%,
      rgba(255, 255, 255, 0.7) 50%,
      #ffffff 100%
    );
    transition: width 0.4s ease-in-out;
    border-radius: 10px;
  }

  .hover-underline:hover::after {
    width: 100%;
  }

  @media (max-width: 768px) {
    .hover-underline {
      white-space: nowrap;
    }
  }
`}</style>

    </section>
  );
};

export default ComingSoon;
