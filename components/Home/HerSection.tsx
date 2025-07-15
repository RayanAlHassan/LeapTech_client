// HeroSection.tsx
'use client';

import React, { useState, useEffect } from 'react';
import StoryAnimation from "../Animation/StoryAnimation";
import PrimaryButton from "../ui/PrimaryButton";
import Link from "next/link";

const HeroSection: React.FC = () => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowText(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="container-fluid py-5">
      <div className="row align-items-center" style={{ minHeight: "70vh" }}>
        {/* Left Side: Text + Button */}
        <div className="col-md-6 d-flex flex-column align-items-start justify-content-center">
          <div className={`animated-text-box ${showText ? 'show-text' : 'hide-text'}`}>
            <h1 className="hero-title mb-3">
              Empowering Your <span className="text-blue">Digital Leap</span>
            </h1>
            <p className="lead text-muted mb-3">Custom Software Solutions for a Smarter Tomorrow</p>
            <p className="mb-2">Learn more about our company and values.</p>
          </div>
          <Link href="/services" legacyBehavior>
            <a>
              <PrimaryButton className="primary-button mt-4">READ MORE</PrimaryButton>
            </a>
          </Link>
        </div>

        {/* Right Side: Animation */}
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <StoryAnimation />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
