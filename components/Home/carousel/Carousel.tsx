'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

import webImage from '@/public/images/web.jpg';
import socialImage from '@/public/images/sm.jpg';
import mobileImage from '@/public/images/mobileBlue.jpg';

const slides = [
  {
    title: 'Web Development',
    description: 'Professional websites and e-commerce platforms tailored to your brand.',
    image: webImage,
    route: '/services/web',
  },
  {
    title: 'Social Media Marketing',
    description: 'Boost brand visibility and engagement through digital strategies.',
    image: socialImage,
    route: '/services/social-media',
  },
  {
    title: 'Mobile Application',
    description: 'Robust, user-friendly apps for iOS and Android platforms.',
    image: mobileImage,
    route: '/services/mobile',
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
    <section className="container-fluid py-5" style={{ minHeight: '70vh', overflow: 'hidden' }}>
      <div className="container h-100">
        <div className="row align-items-center justify-content-center h-100 text-center">
          <h2 className="our-story-title mb-4 text-center title-blue">Our Service</h2>
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

<button
  className="arrowss left rounded-circle p-2"
  onClick={handlePrev}
  style={{
    position: 'absolute',
    top: '50%',
    left: '10px',
    transform: 'translateY(-50%)',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    fontSize: '30px',
    cursor: 'pointer',
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  ‹
</button>

<button
  className="arrowss right rounded-circle p-2"
  onClick={handleNext}
  style={{
    position: 'absolute',
    top: '50%',
    right: '10px',
    transform: 'translateY(-50%)',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    fontSize: '30px',
    cursor: 'pointer',
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  ›
</button>


          </div>

          <div className="d-flex justify-content-center gap-2 mt-4">
          {slides.map((_, i) => (
  <button
    key={i}
    onClick={() => setCenterIndex(i)}
    aria-label={`Go to slide ${i + 1}`}
    style={{
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      backgroundColor: centerIndex === i ? 'var(--navbar-bg)' : '#dee2e6',
      border: 'none',
      margin: '0 4px',
      cursor: 'pointer',
    }}
  />
))}

          </div>
        </div>
      </div>

      <style jsx>{`
      .arrowss {
        border: none;
        transition: all 0.3s ease;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        font-size: 30px;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 10;
      }
      
      /* Left arrow default & hover */
      .arrowss.left {
        background-color: var(--navbar-bg) ;
        color: var(--gray-bg);
        left: 10px;
      }
      .arrowss.left:hover {
        background-color: var(--gray-bg);
        color: var(--navbar-bg);
      }
      
      /* Right arrow default & hover */
      .arrowss.right {
        background-color:var(--navbar-bg) ;
        color: var(--gray-bg);
        right: 10px;
      }
      .arrowss.right:hover {
        background-color:var(--gray-bg) ;
        color: var(--navbar-bg);
      }
      
  .carousel-arrow {
    position: absolute;
    top: 6
    0%; /* center vertically */
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.1);
    border: none;
    font-size: 2.5rem;
    color: #19335d;
    padding: 0.2rem 0.6rem;
    cursor: pointer;
    z-index: 10;
    transition: background 0.3s ease;
  }

  .carousel-arrow.left {
    left: 0;
  }

  .carousel-arrow.right {
    right: 0;
  }

  .carousel-arrow:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .carousel-arrow:hover:not(:disabled) {
    background: rgba(0, 0, 0, 0.25);
    color: white;
  }
`}</style>



    </section>
  );
};

export default Custom3DCarousel;
