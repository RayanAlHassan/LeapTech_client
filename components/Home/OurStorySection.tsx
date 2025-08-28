"use client";

import React, { useState,useEffect } from "react";
import PrimaryButton from "../ui/PrimaryButton";
import { useLanguage } from "@/context/LanguageContext";

const OurStorySection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useLanguage(); // Use language context
  const [mounted, setMounted] = useState(false);


  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null; // prevent SSR mismatch

  return (
    <section
      className={`our-story-section text-white text-center py-5 ${
        isExpanded ? "expanded-bg" : ""
      }`}
    >
      <div className={`background-gradient ${isExpanded ? "fade-out" : "fade-in"}`} />
      <div className={`background-solid ${isExpanded ? "fade-in" : "fade-out"}`} />

      <h2 className="our-story-title mb-4 text-center text-white">
        {t.ourStory.title}
      </h2>
      <div className="story-underline mx-auto mb-4"></div>

      <p className={`story-text mx-auto ${isExpanded ? "expanded" : "clamped"}`}>
        {t.ourStory.description.split(" ").map((word, i) => (
          <span key={i} className="highlight-word">
            {word}{" "}
          </span>
        ))}
      </p>

      <PrimaryButton onClick={toggleReadMore} className="btn btn-outline-light mt-3">
        {isExpanded ? t.ourStory.showLess : t.ourStory.readMore}
      </PrimaryButton>
    </section>
  );
};

export default OurStorySection;
