"use client";

import React, { useState } from "react";
import PrimaryButton from "../../ui/PrimaryButton";
import { Modal } from "react-bootstrap";
import ConsultUsForm from "./ConsultUsForm";
const ConsultUsSection: React.FC = () => {
  const [show, setShow] = useState(false);

  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);

  return (
    <>
      <section
        id="consult-us"
        className="container-fluid consult-us-section py-5"
        style={{
          background: "linear-gradient(90deg, #f0f4f8 0%, #d9e2ec 100%)",
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="container">
          <div className="row align-items-center h-100">
            <div className="row align-items-center justify-content-center h-100 text-center">
              <h2 className="our-story-title mb-4 text-center title-blue">
                Consult Us
              </h2>
              <div className="story-underline blue-gradient mx-auto mb-4 "></div>
            </div>
            {/* Text */}
            <div className="slangText col-lg-6 mb-4 mb-lg-0">
              <h2
                className="header2"
                style={{
                  fontSize: "clamp(2.25rem, 5vw, 4.5rem)", // Responsive font size
                  fontWeight: 700,
                  fontFamily: "var(--font-title)",
                  lineHeight: 1.3,
                  color: "var(--navbar-bg)",
                }}
              >
                Need Assistance?
                <span style={{ fontSize: "2.8rem", marginTop: "-1rem" }}>
                  Schedule a Consultation.
                </span>
                {/* <div className="story-underline blue-gradient"></div> */}
              </h2>
              <p
                style={{
                  fontSize: "1.15rem",
                  color: "#4a4a4a",
                  marginBottom: "1.5rem",
                  lineHeight: "1.6",
                  maxWidth: "95%",
                }}
              >
                Our team is always ready to support you.
                <br /> Get Your Free Consultation Today!
              </p>
              <PrimaryButton onClick={openModal}>CONSULT US</PrimaryButton>
            </div>

            {/* Image + Border */}
            <div className="col-lg-6 d-flex justify-content-center">
              <div className="animated-border-wrapper" style={{height:"40% !important"}}>
             
                <video
                  src="/videos/leapVd.mp4"
                  autoPlay
                  controls={false}
                  muted
                  playsInline
                  loop
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "12px",
                  }}
                />
                <div className="vertical-line left"></div>
                <div className="vertical-line right"></div>
                <div className="vline" />
                <div className="hline" />
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        <Modal show={show} onHide={closeModal} centered size="lg">
          <Modal.Header closeButton className="form-section">
            <Modal.Title className="form-title">Consult Us</Modal.Title>
          </Modal.Header>
          <Modal.Body className="form-section">
            <ConsultUsForm />
          </Modal.Body>
        </Modal>
      </section>

      {/* 🔥 Styled JSX for animated gradient border */}
      <style jsx>{`
        .story-underline.blue-gradient {
          background: linear-gradient(
            90deg,
            var(--navbar-bg) 0%,
            rgba(25, 51, 93, 0.7) 50%,
            var(--accent-blue) 100%
          );
        }
        .animated-border-wrapper {
          position: relative;
          display: inline-block;
          border-radius: 10px;
          padding: 8px;
          background: transparent;
          width: 80%;
        }

        /* Base for all animated lines */
        .animated-border-wrapper::before,
        .animated-border-wrapper::after,
        .animated-border-wrapper > .vline,
        .animated-border-wrapper > .hline {
          content: "";
          position: absolute;
          background: linear-gradient(
            90deg,
            var(--navbar-bg) 0%,
            rgba(25, 51, 93, 0.7) 50%,
            var(--accent-blue) 100%
          );
          border-radius: 10px;
          pointer-events: none;
          z-index: 2;
        }

        /* Top-left corner ➡️ top center */
        .animated-border-wrapper::before {
          top: 0;
          left: 0;
          height: 4px;
          width: 0;
          animation: horizontal-expand-left 4s ease-in-out infinite;
        }

        /* Bottom-left corner ⬆️ left center */
        .animated-border-wrapper::after {
          bottom: 0;
          left: 0;
          width: 4px;
          height: 0;
          animation: vertical-expand-left 4s ease-in-out infinite;
        }

        /* Top-right corner ⬇️ right center */
        .animated-border-wrapper > .vline {
          top: 0;
          right: 0;
          width: 4px;
          height: 0;
          background: linear-gradient(
            180deg,
            var(--navbar-bg) 0%,
            rgba(25, 51, 93, 0.7) 50%,
            var(--accent-blue) 100%
          );
          animation: vertical-expand-right 4s ease-in-out infinite;
          animation-delay: 2s;
        }

        /* Bottom-right corner ⬅️ bottom center */
        .animated-border-wrapper > .hline {
          bottom: 0;
          right: 0;
          height: 4px;
          width: 0;
          background: linear-gradient(
            270deg,
            var(--navbar-bg) 0%,
            rgba(25, 51, 93, 0.7) 50%,
            var(--accent-blue) 100%
          );
          animation: horizontal-expand-right 4s ease-in-out infinite;
          animation-delay: 2s;
        }

        /* Animations */
        @keyframes horizontal-expand-left {
          0%,
          100% {
            width: 0;
          }
          50% {
            width: 50%;
          }
        }

        @keyframes vertical-expand-left {
          0%,
          100% {
            height: 0;
          }
          50% {
            height: 50%;
          }
        }

        @keyframes vertical-expand-right {
          0%,
          100% {
            height: 0;
          }
          50% {
            height: 50%;
          }
        }

        @keyframes horizontal-expand-right {
          0%,
          100% {
            width: 0;
          }
          50% {
            width: 50%;
          }
        }

        //////////////////

        /* Modal Header + Body background unified */
        .form-section {
          background: linear-gradient(135deg, #003366, #1e4976);
          color: white;
          border: none !important;
        }

        /* Fix modal container */
        :global(.modal-content) {
          border-radius: 0 !important;
          border: none !important;
          background-color: transparent;
          box-shadow: none;
        }

        /* Remove spacing between header and body */
        :global(.modal-header),
        :global(.modal-body) {
          border: none !important;
          margin: 0;
          padding: 1.5rem;
          border-radius: 0;
        }

        /* White close (X) button */
        :global(.btn-close) {
          filter: invert(1);
          opacity: 1;
        }

        /* Title underline */
        .form-title {
          font-size: 2rem;
          font-weight: 700;
          color: white;
          position: relative;
          display: inline-block;
          margin-bottom: 0;
        }

        .form-title::after {
          content: "";
          position: absolute;
          bottom: -6px;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(
            90deg,
            white 0%,
            rgba(255, 255, 255, 0.5) 50%,
            white 100%
          );
          animation: underlinePulse 2s infinite ease-in-out;
          border-radius: 5px;
        }

        @keyframes underlinePulse {
          0% {
            transform: scaleX(0.2);
            opacity: 0.6;
            transform-origin: left;
          }
          50% {
            transform: scaleX(1);
            opacity: 1;
            transform-origin: center;
          }
          100% {
            transform: scaleX(0.2);
            opacity: 0.6;
            transform-origin: right;
          }
        }

        /* Submit Button */
        :global(.submit-button) {
          background: transparent;
          color: white;
          border: 2px solid transparent;
          transition: all 0.3s ease;
          padding: 1rem;
        }

        :global(.submit-button:hover) {
          background: linear-gradient(135deg, #003366, #1e4976);
          border-color: white;
          color: white;
        }

        @media (max-width: 992px) {
          :global(.slangText) {
            text-align: center !important;
          }

          .header2 {
            font-size: 1.9rem !important;
          }
          p {
            font-size: 1.1rem !important;
          }
        }
      `}</style>
    </>
  );
};

export default ConsultUsSection;
