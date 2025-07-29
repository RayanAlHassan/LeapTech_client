
"use client";

import React from "react";
import map from "@/public/animations/Goals Map.json"; // adjust path if needed

import Lottie from "lottie-react";
import vision from "../public/animations/Light Solutions - blue green teal.json";
const AboutUs = () => {
  return (
    <div className="container-fluid p-0">
      {/* Section 1 - Our Mission */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="contact-title mb-4 text-center">
            About Us
            <div className={`underline-gradient mx-auto mt-1`}></div>
          </h2>
          <div className="row align-items-center image-text-wrapper">
            {/* Image */}
            <div className="col-md-6 mb-4 mb-md-0 text-center image-animate">
              {/* <Image
                src={mission}
                alt="Our Mission"
                className="img-fluid rounded shadow"
                style={{ maxHeight: 400, width: "auto" }}
              /> */}
              <Lottie animationData={map} loop className="lottie-vision" />
            </div>

            {/* Text */}
            <div className="col-md-6 text-center text-md-start text-animate">
              <h2 className="fw-bold title-blue position-relative d-inline-block mb-3">
                Our Mission
                <div
                  className="story-underline blue-gradient mt-2 mx-auto mx-md-0"
                  style={{ height: 4, width: 120 }}
                />
              </h2>
              <p className="lead" style={{ textAlign: "left" }}>
                <span className="highlight-gradient">Leap Tech</span>
                {` pushing the boundaries of technological innovation, transforming global
ideas into tangible solutions that redefine industry standards. With a commitment to
excellence, we develop cutting-edge software solutions designed to compete at the
highest levels, ensuring businesses stay ahead in a rapidly evolving market`
                  .split(" ")
                  .map((word, i) => (
                    <span key={i} className="hover-underline">
                      {word}&nbsp;
                    </span>
                  ))}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - Our Vision */}
      <section className="py-5 bg-white shapedSection">
        <div className="container">
          <div className="row align-items-center flex-md-row-reverse image-text-wrapper">
            {/* Image */}
            <div className="col-md-6 mb-4 mb-md-0 text-center image-animate">
              <Lottie animationData={vision} loop className="lottie-vision" />
            </div>

            {/* Text */}
            <div className="col-md-6 text-center text-md-start text-animate">
              <h2 className="fw-bold title-blue position-relative d-inline-block mb-3">
                Our Vision
                <div
                  className="story-underline blue-gradient mt-2 mx-auto mx-md-0"
                  style={{ height: 4, width: 120 }}
                />
              </h2>
              <p className="lead" style={{ textAlign: "left" }}>
                {`At `}
                <span className="highlight-gradient">Leap Tech</span>
                {` International, we envision a future where innovation knows no
boundaries. Our goal is to expand across the region, empowering businesses with
cutting-edge SaaS, PaaS, and digital solutions that drive efficiency, growth, and
superior customer experiences.`
                  .split(" ")
                  .map((word, i) => (
                    <span key={i} className="hover-underline">
                      {word}&nbsp;
                    </span>
                  ))}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 - Text Only */}
      <section className="py-5 bg-light text-center">
        <div className="container">
          <h2 className="fw-bold title-blue position-relative d-inline-block mb-3">
            Leap At A Glance
            <div
              className="story-underline blue-gradient mt-2 mx-auto"
              style={{ height: 4, width: 160 }}
            />
          </h2>
          <p
            className="lead mx-auto"
            style={{ maxWidth: "800px", textAlign: "left" }}
          >
            {`Pioneering Innovation, Empowering Digital Transformation
In a world where technology is the heartbeat of progress, `}
            <span className="highlight-gradient">Leap Tech</span>
            {` stand at the
forefront— fueling businesses with cutting-edge Software-as-a-Service (SaaS) and
Platform-as-a- Service (PaaS) solutions. But we do not stop there. From shaping your
brand’s identity to managing your presence across social media landscapes, we craft
digital journeys that redefine success.
At our core, we are innovators, strategists, and visionaries, passionate about
bridging businesses to the future. Whether it’s optimizing workflows, amplifying
brand impact, or navigating the digital era with confidence, we equip enterprises
with the tools to thrive.`
              .split(" ")
              .map((word, i) => (
                <span key={i} className="hover-underline">
                  {word}&nbsp;
                </span>
              ))}
          </p>
        </div>
      </section>

      <style jsx>{`
        .contact-title {
          font-size: clamp(2.25rem, 5vw, 4.5rem);
          font-weight: 700;
          font-family: var(--font-title);
          line-height: 1.3;
          color: var(--navbar-bg);
          position: relative;
          display: inline-block;
          margin-bottom: 2rem;
        }
        .underline-gradient {
          width: 120px;
          height: 4px;
          border-radius: 5px;
          background: linear-gradient(
            90deg,
            var(--navbar-bg) 0%,
            rgba(25, 51, 93, 0.7) 50%,
            var(--accent-blue) 100%
          );
          animation: underlinePulse 2s infinite ease-in-out;
          margin-top: 0.5rem;
          transform-origin: center;
        }
        .underline-gradient.paused {
          animation-play-state: paused;
        }

        @keyframes underlinePulse {
          0% {
            transform: scaleX(0);
            opacity: 0.6;
            transform-origin: center;
          }
          50% {
            transform: scaleX(1);
            opacity: 1;
            transform-origin: center;
          }
          100% {
            transform: scaleX(0);
            opacity: 0.6;
            transform-origin: center;
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

        .image-text-wrapper {
          position: relative;
        }

        .image-animate {
          animation: fadeScaleIn 0.8s ease-out forwards;
        }

        .text-animate {
          opacity: 0;
          animation: slideFromBehind 1s ease-out 0.9s forwards;
        }

        @keyframes fadeScaleIn {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideFromBehind {
          0% {
            transform: translateX(-60px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .lottie-vision {
          max-width: 100%;
          height: 400px;
          margin: 0 auto;
        }

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
            var(--navbar-bg) 0%,
            rgba(25, 51, 93, 0.7) 50%,
            var(--accent-blue) 100%
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
        .highlight-gradient {
          background: linear-gradient(
            90deg,
            var(--navbar-bg) 0%,
            rgba(25, 51, 93, 0.7) 50%,
            var(--accent-blue) 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default AboutUs;