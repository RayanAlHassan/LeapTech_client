"use client";

import React from "react";
import Image from "next/image";
import lamp from "@/public/images/lamp.png";

const LampSection = () => {
  return (
    <section
      className="d-flex flex-column justify-content-center align-items-center bg-light"
      style={{
        padding: "2rem 0rem 5rem", // reduced top padding
        position: "relative",
        background: "linear-gradient(90deg, #f0f4f8 0%, #d9e2ec 100%)",
        height: "63vh",
        paddingTop:" 2rem",
      }}
    >
      {/* Title ABOVE the image */}
      <h2 className="fw-bold title-blue position-relative d-inline-block mb-0">
        Our Vision
        <div
          className="story-underline blue-gradient mt-2 mx-auto mx-md-0"
          style={{ height: 4, width: 120 }}
        />
      </h2>

      {/* Image container */}
      <div
        className="position-relative w-100 d-flex justify-content-center"
        style={{
          transform: "translateX(-1%)",
        }}
      >
        {/* Lamp Image */}
        <Image
          src={lamp}
          alt="Lamp"
          className=" lamppp img-fluid"
          priority
          style={{
            width: "65%",
            height: "393px",
            // maxWidth: "1200px", // Prevents it from getting too wide
          }}
        />

        {/* Paragraph text centered INSIDE the lamp image */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center px-3"
          style={{
            pointerEvents: "none",
          }}
        >
          <div className="lamp-text text-center">
            <p className="lead lamp-paragraph">
              At <span className="highlight-gradient">Leap Tech</span>{" "}
              International, we envision a future where innovation knows no
              boundaries. Our goal is to expand across the region, empowering
              businesses with cutting-edge SaaS, PaaS, and digital solutions
              that drive efficiency, growth, and superior customer experiences.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .vision-title {
          font-family: var(--font-title);
          font-weight: 700;
          font-size: clamp(2rem, 5vw, 4rem);
          line-height: 1.3;
          position: relative;
          display: inline-block;
          color: #fff;
        }

        // .vision-underline {
        //   width: 120px;
        //   height: 4px;
        //   border-radius: 5px;
        //   background: linear-gradient(
        //     90deg,
        //     #fff 0%,
        //     rgba(255, 255, 255, 0.7) 50%,
        //     #ccc 100%
        //   );
        //   animation: underlinePulse 2s infinite ease-in-out;
        //   margin-top: 0.5rem;
        //   transform-origin: center;
        // }

        @keyframes underlinePulse {
          0% {
            transform: scaleX(0);
            opacity: 0.6;
          }
          50% {
            transform: scaleX(1);
            opacity: 1;
          }
          100% {
            transform: scaleX(0);
            opacity: 0.6;
          }
        }

        .lamp-text {
          color: var(--navbar-bg);
          position: absolute;
          top: 50%;
          left: 55%;
          transform: translate(-50%, -50%);
          max-width: 60%;
          width: 50%;
          padding: 0 1rem;
          pointer-events: none;
          text-align: center;
        }

        .lamp-paragraph {
          line-height: 1.5;
          margin: 0;
        }
        @media (max-width: 768px) {
          .lamp-text {
            max-width: 80%;
            padding: 0 1rem;
          }

          .lamp-paragraph {
            font-size: 0.9rem;
          }
        }

        @media (max-width: 680px) {
          .lamp-text {
            max-width: 100% !important;
          }

          .lamp-paragraph {
            font-size: 16px;
          }
        }

        @media (max-width: 480px) {
          .lamp-paragraph {
            width: 100%;
            font-size: 12px;
          }
        }
        @media (min-width: 1400px) {
         

          .lamp-paragraph {
            font-size: 1.3rem;
          }
        }

        @media (min-width: 1600px) {
          .lamppp {
          }
          .lamp-text {
            left: 60%;
          }

          .lamp-paragraph {
            font-size: 1.4rem;
            width: 80%;
          }
        }
        .title-blue {
          color: var(--navbar-bg);
        }
        .story-underline.blue-gradient {
          background: linear-gradient(
            90deg,
            var(--navbar-bg) 0%,
            rgba(25, 51, 93, 0.7) 50%,
            var(--accent-blue) 100%
          );
        }
      `}</style>
    </section>
  );
};

export default LampSection;
