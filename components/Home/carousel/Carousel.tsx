"use client";

import React, { useState,useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSwipeable } from "react-swipeable";

import webImage from "@/public/images/website.png";
import socialImage from "@/public/images/digital.png";
import mobileImage from "@/public/images/mobileApps.png";
import seo from "@/public/images/seo.png";
import smartHome from "@/public/images/smartHomeBlue.png";
import cloud from "@/public/images/cloud.png";
import fintech from "@/public/images/fintech.png";

import { useLanguage } from "@/context/LanguageContext";


const slidesData = (t: any) => [
  {
    title: t.services.webAppTitle,
    description: t.services.webAppDesc,
    image: webImage,
  },
  {
    title: t.services.eBusinessTitle,
    description: t.services.eBusinessDesc,
    image: socialImage,
  },
  {
    title: t.services.digitalMarketingTitle,
    description: t.services.digitalMarketingDesc,
    image: seo,
  },
  {
    title: t.services.mobileAppTitle,
    description: t.services.mobileAppDesc,
    image: mobileImage,
  },
  {
    title: t.services.smartHomeTitle,
    description: t.services.smartHomeDesc,
    image: smartHome,
  },
  {
    title: t.services.cloudTitle,
    description: t.services.cloudDesc,
    image: cloud,
  },
  {
    title: t.services.finTechTitle,
    description: t.services.finTechDesc,
    image: fintech,
  },
];

const positionStyles = {
  left: { x: -380, rotateY: -20, zIndex: 1 },
  center: { x: 0, rotateY: 0, zIndex: 2 },
  right: { x: 380, rotateY: 20, zIndex: 1 },
};

const Custom3DCarousel: React.FC = () => {
  const { t } = useLanguage();
  const slides = slidesData(t);

  const router = useRouter();
  const [centerIndex, setCenterIndex] = useState(0);

  const handleNext = () => setCenterIndex((prev) => (prev + 1) % slides.length);
  const handlePrev = () =>
    setCenterIndex((prev) => (prev - 1 + slides.length) % slides.length);

  const getPosition = (i: number) => {
    const leftIndex = (centerIndex - 1 + slides.length) % slides.length;
    const rightIndex = (centerIndex + 1) % slides.length;

    if (i === leftIndex) return "left";
    if (i === centerIndex) return "center";
    if (i === rightIndex) return "right";
    return null;
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });
  const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);
  if (!mounted) return null; // prevent SSR mismatch

  return (
    <section
      className="container-fluid py-5 carousel"
      style={{ minHeight: "60vh", overflow: "hidden", display: "flex", alignItems: "center" }}
    >
      <div className="container h-100">
        <div className="row align-items-center justify-content-center h-100 text-center">
          <h2 className="our-story-title mb-4 text-center title-blue">{t.services.title}</h2>
          <div className="story-underline blue-gradient mx-auto mb-4"></div>

          <div
            {...swipeHandlers}
            className="position-relative d-flex justify-content-center align-items-center"
            style={{ width: "100%", height: "500px", perspective: "1000px" }}
          >
            {slides.map((slide, i) => {
              const pos = getPosition(i);
              if (!pos) return null;

              return (
                <motion.div
                  key={slide.title}
                  className="position-absolute d-flex flex-column align-items-center text-center"
                  style={{
                    width: "300px",
                    zIndex: positionStyles[pos].zIndex,
                    cursor: pos === "center" ? "pointer" : "default",
                    height: "100%",
                    justifyContent: "flex-start",
                  }}
                  animate={{
                    x: positionStyles[pos].x,
                    rotateY: positionStyles[pos].rotateY,
                    scale: pos === "center" ? 1 : 0.95,
                  }}
                  transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
                  onClick={() =>
                    pos === "center"
                      ? router.push(`/services/category/${encodeURIComponent(slide.title)}`)
                      : null
                  }
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    style={{ width: "100%", height: "260px", objectFit: "cover", borderRadius: "20px" }}
                  />

                  {pos !== "center" && <div style={{ height: "100px" }} />}
                  {pos === "center" && (
                    <motion.div
                      className="mt-4 px-2"
                      initial={{ opacity: 0, y: -100 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.2 }}
                    >
                      <h3 className="fw-bold" style={{ fontSize: "1.9rem", color: "#19335d" }}>
                        {slide.title}
                      </h3>
                      <p style={{ fontSize: "1.1rem", color: "#4a4a4a" }}>{slide.description}</p>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}

            <div className="arrows-wrapper">
              <button className="arrowss left-arrow" onClick={handlePrev}>
                <ChevronLeft />
              </button>
              <button className="arrowss right-arrow" onClick={handleNext}>
                <ChevronRight />
              </button>
            </div>
          </div>

          <div className="d-flex justify-content-center gap-2 mt-4">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCenterIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={centerIndex === i ? "dot active" : "dot"}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .carousel {
          background: linear-gradient(90deg, #f0f4f8 0%, #d9e2ec 100%);
        }
        .arrows-wrapper {
          display: flex;
          justify-content: space-between;
          width: 100%;
          padding: 0 1rem;
          position: relative;
        }
        .arrowss {
          width: 40px;
          height: 40px;
          background-color: var(--navbar-bg);
          color: var(--gray-bg);
          border-radius: 50%;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
        }
        .arrowss svg {
          font-size: 20px;
          color: var(--gray-bg);
        }
        .left-arrow {
          left: 10px;
        }
        .right-arrow {
          right: 10px;
        }
        .dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background-color: #dee2e6;
          border: none;
          margin: 0 6px;
          cursor: pointer;
        }
        .dot.active {
          background-color: var(--navbar-bg);
        }
        @media (max-width: 768px) {
          .arrowss {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Custom3DCarousel;
