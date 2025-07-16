import React, { useState, useEffect } from "react";
import PrimaryButton from "../ui/PrimaryButton";

const OurStorySection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showGlimpse, setShowGlimpse] = useState(false);

  const toggleReadMore = () => {
    if (!isExpanded) {
      setShowGlimpse(true);
      setIsExpanded(true);

      // Remove glimpse class after animation (1.2s)
      setTimeout(() => setShowGlimpse(false), 1200);
    } else {
      setIsExpanded(false);
    }
  };

  return (
    <section
    className={`our-story-section text-white text-center py-5 ${
      isExpanded ? "expanded-bg" : "collapsed-animated"
    }`}
    >
      <h2 className="our-story-title mb-4 text-center text-white">Our Story</h2>
      <div className="story-underline mx-auto mb-4"></div>

      <p className={`story-text mx-auto ${isExpanded ? "expanded" : "clamped"}`}>
        {/*
          Wrap every word with span.highlight-word to enable cursor pointer and highlight on hover.
          You can do this manually or dynamically if you want.
        */}
        {`Leap Tech has been instrumental in transforming the digital landscape for businesses
          of all sizes, from ambitious startups to established enterprises. By delivering tailored
          Software-as-a-Service (SaaS) and Platform-as-a-Service (PaaS) solutions, the
          company has empowered local businesses to optimize their operations, streamline
          workflows, and enhance customer experiences. As a result, clients have witnessed
          significant revenue growth, improved efficiency, and strengthened brand loyalty.
          With a commitment to innovation and excellence, Leap Tech has not only enabled
          companies to thrive in a competitive market but has also set new benchmarks for
          superior customer service, fostering lasting relationships between businesses and
          their audiences.`.split(" ").map((word, i) => (
            <span key={i} className="highlight-word">
              {word}{" "}
            </span>
          ))}
      </p>

      <PrimaryButton
  onClick={toggleReadMore}
  className="btn btn-outline-light"
>
  {isExpanded ? "Show Less" : "Read More"}
</PrimaryButton>



    </section>
    
  );
};

export default OurStorySection;
