'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

import webImage from '@/public/images/website.png';
import socialImage from '@/public/images/digital.png';
import mobileImage from '@/public/images/mobileApps.png';
import seo from '@/public/images/seo.png';

import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    title: 'Web Development',
    description: 'Professional websites and e-commerce platforms tailored to your brand.',
    image: webImage,
    route: '/web',
  },
  {
    title: 'Business',
    description: 'Boost brand visibility and engagement through digital strategies.',
    image: socialImage,
    route: '/socialMedia',
  },
  {
    title: 'Digital Marketing',
    description: 'Drive growth and conversions through targeted campaigns, SEO, and data-driven digital strategies.',
    image: seo,
    route: '/digitalMarketing',
  },
  {
    title: 'Mobile Application',
    description: 'Robust, user-friendly apps for iOS and Android platforms.',
    image: mobileImage,
    route: '/mobileApp',
  },
];



const positionStyles = {
  left: { x: -380, rotateY: -20, zIndex: 1 },
  center: { x: 0, rotateY: 0, zIndex: 2 },
  right: { x: 380, rotateY: 20, zIndex: 1 },
};


const Custom3DCarousel: React.FC = () => {
  const router = useRouter();
  const [centerIndex, setCenterIndex] = useState(1);

  const handleNext = () => {
    setCenterIndex((prev) => (prev + 1) % slides.length);
  };
  
  const handlePrev = () => {
    setCenterIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };
  
  
  const getPosition = (i: number) => {
    const leftIndex = (centerIndex - 1 + slides.length) % slides.length;
    const rightIndex = (centerIndex + 1) % slides.length;
  
    if (i === leftIndex) return 'left';
    if (i === centerIndex) return 'center';
    if (i === rightIndex) return 'right';
    return null;
  };
  

  return (
    <section className="container-fluid py-5" style={{ minHeight: '60vh', overflow: 'hidden' , display:'flex', alignItems:'center'}}>
      <div className="container h-100">
        <div className="row align-items-center justify-content-center h-100 text-center">
          <h2 className="our-story-title mb-4 text-center title-blue">Our Services</h2>
          <div className="story-underline blue-gradient mx-auto mb-4"></div>

          <div
  className="position-relative d-flex justify-content-center align-items-center"
  style={{ width: '100%', height: '500px', perspective: '1000px' }}
>

            {slides.map((slide, i) => {
              const pos = getPosition(i);
              if (!pos) return null;

              return (
            // Inside your Custom3DCarousel.tsx (React + Next.js)
<motion.div
  key={slide.title}
  className={`position-absolute d-flex flex-column align-items-center text-center`}
  style={{
    width: '300px',
    zIndex: positionStyles[pos].zIndex,
    cursor: pos === 'center' ? 'pointer' : 'default',
    height: '100%', // Make sure all slides are same height
    justifyContent: 'flex-start', // Align all images to the top of the card
  }}
  animate={{
    x: positionStyles[pos].x,
    rotateY: positionStyles[pos].rotateY,
    scale: pos === 'center' ? 1 : 0.95,
  }}
  transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
  onClick={() =>
    pos === 'center' ? router.push(slide.route) : null
  }
>
  <Image
    src={slide.image}
    alt={slide.title}
    className="rounded"
    style={{
      width: '100%',
      height: '260px',
      objectFit: 'cover',
      borderRadius: '20px',
    }}
  />

  {/* Spacer to preserve height where text would go */}
  {pos !== 'center' && <div style={{ height: '100px' }} />}

  {pos === 'center' && (
    <motion.div
      className="mt-4 px-2"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2 }}
    >
      <h3 className="fw-bold" style={{ fontSize: '1.9rem', color: '#19335d' }}>
        {slide.title}
      </h3>
      <p style={{ fontSize: '1.1rem', color: '#4a4a4a' }}>
        {slide.description}
      </p>
    </motion.div>
  )}
</motion.div>



              );
            })}
<div className="arrows-wrapper">
  <button className="arrowss left-arrow" onClick={handlePrev}>
    <span><ChevronLeft/></span> {/* or use an <i className="fa fa-chevron-left" /> */}
  </button>
  <button className="arrowss right-arrow" onClick={handleNext}>
    <span><ChevronRight/></span>
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

.arrowss svg,
.arrowss span,
.arrowss i {
  font-size: 20px;
  color: #f0f0f0;
}


.left-arrow {
  left: 10px;
}

.right-arrow {
  right: 10px;
}
.arrowss span,
.arrowss svg,
.arrowss i {
  font-size: 20px;
  color: var(--gray-bg); /* or gray */
  line-height: 1;
  display: inline-block;
}


.dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: #dee2e6;
  border: none;
  margin: 0 6px;
  cursor: pointer;
  flex-grow: 0;
  flex-shrink: 0;
  padding: 0;
  display: inline-block;
  transition: background-color 0.3s ease;
}

.dot.active {
  background-color: var(--navbar-bg);
}


@media (max-width: 768px) {
  .dot {
    width: 18px;
    height: 18px;
    margin: 0 8px;
  }
}


`}
</style>



    </section>
  );
};

export default Custom3DCarousel;
