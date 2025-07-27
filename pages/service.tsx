"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/router";
import seo from '@/public/images/seo.png';
import web from "@/public/images/website.png";
import sm from "@/public/images/digital.png";
import app from "@/public/images/mobileApps.png";
interface Service {
  image: StaticImageData;
  title: string;
  description: string;
  route: string;
}

const services: Service[] = [
  {
    title: "Web Development",
    description:
      "Professional websites and e-commerce platforms tailored to your brand.",
    image: web,
    route: "/web",
  },
  {
    title: "Business & Digital Marketing",
    description:
      "Boost brand visibility and engagement through digital strategies.",
    image: sm,
    route: "/socialMedia",
  },
  {
    title: "Mobile Application",
    description: "Robust, user-friendly apps for iOS and Android platforms.",
    image: app,
    route: "/mobileApp",
  },
  {
    title: 'Digital Marketing',
    description: 'Drive growth and conversions through targeted campaigns, SEO, and data-driven digital strategies.',
    image: seo,
    route: '/digitalMarketing',
  },
];

const service = () => {
  const router = useRouter();

  return (
    <section
      className="container-fluid py-5"
      style={{
        background: "linear-gradient(90deg, #f0f4f8 0%, #d9e2ec 100%)",
        minHeight: "70vh",
      }}
    >
      <div className="container">
        {/* Title Section */}
        <h2 className="text-center mb-5 our-title">
          Our Service
          <div className={`underline-gradient mx-auto mt-1 `}></div>
        </h2>

        {/* Service Cards */}
        <div className="row g-3 justify-content-center">
          {services.map((service, index) => (
            <div
              key={index}
              className="col-12 col-md-6 col-lg-4 d-flex justify-content-center"
            >
              <div
                className="serviceBox bg-light"
                onClick={() => router.push(service.route)}
                style={{ cursor: "pointer" }} // Optional: show pointer cursor
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  className="careerImage"
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "20px",
                    // backgroundColor: "var(--navbar-bg)",
                  }}
                />
                <div className="overlay"></div>
                <div className="textContainer">
                  <h5 className="titleCard">{service.title}</h5>
                  <p className="clampedText">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Styling */}
      <style jsx>{`
        .our-title {
          font-size: clamp(2.25rem, 5vw, 4.5rem);
          font-weight: 700;
          font-family: var(--font-title);
          color: var(--navbar-bg);
          position: relative;
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
          transform-origin: center;
        }
        .paused {
          animation-play-state: paused;
        }
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
        .serviceBox {
          position: relative;
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;
          flex-direction: column;
          width: 100%;
          max-width: 380px;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          text-align: left;
          border-radius: 10px;
          transition: transform 0.3s ease;
        }

        .sectionPadding {
          padding-left: 10%;
          padding-right: 10%;
          margin-top: 5rem;
        }

        .careerImage {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
          border-radius: 10px;
        }

        .overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgb(35 42 84 / 62%), transparent);
          // background: linear-gradient(to top, rgb(35 42 84), transparent);          transition: background 0.3s ease;
          border-radius: 10px;
        }

        .textContainer {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px;
          color: white;
          height: 120px;
          max-height: 120px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          transition: height 0.3s ease, max-height 0.3s ease,
            transform 0.3s ease;
        }

        .titleCard {
          text-transform: uppercase;
          margin-bottom: 8px;
          line-height: 1.2;
          text-align:center
        }

        .clampedText {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: 0;
          line-height: 1.4;
          font-size: 14px;
          transition: transform 0.3s ease;
          text-align:center

        }

        /* Hover Effects */
        .serviceBox:hover .textContainer {
          height: 100%;
          max-height: 100%;
          transform: translateY(-20%);
        }

        .serviceBox:hover .overlay {
          background: linear-gradient(to top, rgb(29 24 69), rgba(0, 0, 0, 0.5));
          );
        }

        .serviceBox:hover .careerImage {
          transform: scale(1.05);
        }

        .serviceBox:hover .clampedText {
          -webkit-line-clamp: unset;
          transform: translateY(0);
        }

        @media (max-width: 768px) {
          .sectionPadding {
            padding-left: 5%;
            padding-right: 5%;
          }
        }
      `}</style>
    </section>
  );
};

export default service;
