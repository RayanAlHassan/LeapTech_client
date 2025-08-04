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
    <section className="container-fluid hero-section py-5" >
      <div className="container" style={{ height: "100%" }}>
      <div className="row align-items-center" style={{ minHeight: "70vh", height:"100%"}}>
       {/* Left Side: Text + Button */}
       <div className="col-lg-6 d-flex flex-column align-items-start justify-content-center text-center text-md-start">
  <div className={`animated-text-box ${showText ? "show-text" : ""}`}>
    <h1 className="hero-title mb-5">
      Empowering Your{" "}
      <span className="text-blue">Digital Business</span>
    </h1>
    <small
      className={`fst-italic mb-2 d-block ${showText ? "show-text" : ""}`}
      style={{ color: "#6c757d", fontSize: "2rem" }}
    >
      INNOVATE. INTEGRATE. ELEVATE.
    </small>
    <p
      className="lead text-muted mb-3 slogan2"
      style={{ color: "black" }}
    >
      We Build It. You Own It.
    </p>
    <p className="mb-2 fst-italic" style={{ color: "#6c757d" }}>
      Web, Mobile, and Digital Marketing.
    </p>
  </div>
  <Link href="/services" style={{textDecoration:"none"}} className='itsA'>
    <PrimaryButton className="primary-button mt-4">
      LEARN MORE
    </PrimaryButton>
  </Link>
</div>


          {/* Right Side: Animation */}
          <div className="col-lg-6 d-flex justify-content-center align-items-center">
            <StoryAnimation />
          </div>
        </div>
      </div>
    
    </section>
  );
};

export default HeroSection;
