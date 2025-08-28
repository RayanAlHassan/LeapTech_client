"use client";

import React, { useState, useEffect } from "react";
import StoryAnimation from "../Animation/StoryAnimation";
import PrimaryButton from "../ui/PrimaryButton";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const HeroSection: React.FC = () => {
  const [showText, setShowText] = useState(false);
  const { t, dir } = useLanguage(); // get dir from context
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowText(true);
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  const isRtl = dir === "rtl"; // Arabic check
  if (!mounted) return null;

  return (
    <section className="container-fluid hero-section py-5">
      <div className="container" style={{ height: "100%" }}>
        <div
          className="row align-items-center"
          style={{ minHeight: "70vh", height: "100%" }}
        >
          {/* Text Section */}
          <div
            className={`col-lg-6 d-flex flex-column justify-content-center ${
              isRtl ? "order-lg-2 align-items-lg-end text-lg-end" : "order-lg-1 align-items-start text-md-start text-center"
            }`}
          >
            <div className={`animated-text-box ${showText ? "show-text" : ""}`}>
              <h1 className="hero-title mb-5" style={{ textAlign: isRtl ? "right" : "left" }}>
                {t.heroSection.titlePart1}{" "}
                <span className="text-blue">{t.heroSection.titlePart2}</span>
              </h1>
              <small
                className={`fst-italic mb-2 d-block ${showText ? "show-text" : ""}`}
                style={{ color: "#6c757d", fontSize: "2rem", textAlign: isRtl ? "right" : "left" }}
              >
                {t.heroSection.subtitle}
              </small>
              <p className="lead text-muted mb-3 slogan2" style={{ color: "black", textAlign: isRtl ? "right" : "left" }}>
                {t.heroSection.slogan1}
              </p>
              <p className="mb-2 fst-italic" style={{ color: "#6c757d", textAlign: isRtl ? "right" : "left" }}>
                {t.heroSection.slogan2}
              </p>
            </div>
            <Link href="/services" style={{ textDecoration: "none" }} className="itsA">
              <PrimaryButton className="primary-button mt-4">
                {t.heroSection.button}
              </PrimaryButton>
            </Link>
          </div>

          {/* Animation Section */}
          <div
            className={`col-lg-6 d-flex justify-content-center align-items-center ${
              isRtl ? "order-lg-1" : "order-lg-2"
            }`}
          >
            <StoryAnimation />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
