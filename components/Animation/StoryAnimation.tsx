// StoryAnimation.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import animationData from '@/public/animations/Website CMS .json';

const StoryAnimation: React.FC = () => {
  const animationContainerRef = useRef<HTMLDivElement>(null);
  const [isBlurred, setIsBlurred] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsBlurred(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      ref={animationContainerRef}
      className={`animation-transform ${isBlurred ? 'blur-animation' : 'clear-animation'}`}
      style={{ width: '100%', maxWidth: '570px', height: '100%' }}
    >
      <Lottie
        animationData={animationData}
        loop={false}
        autoplay
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default StoryAnimation;
