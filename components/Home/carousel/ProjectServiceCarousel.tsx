'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import type { StaticImageData } from 'next/image';

import project1 from '@/public/images/homwPage1.jpg';
import project2 from '@/public/images/leap.png';
import project3 from '@/public/images/services.png';
import project4 from '@/public/images/about.png';
import project5 from '@/public/images/contact.png';

interface Project {
  title: string;
  description: string;
  url: string;
  image: StaticImageData;
}

const initialProjects: Project[] = [
  {
    title: 'Company Website',
    description: 'A professional website for Company with custom CMS.',
    image: project1,
    url: 'https://companywebsite.com',
  },
  {
    title: 'IT Solutions',
    description: 'IT Company website optimized for service presentation.',
    image: project2,
    url: 'https://itsolutions.com',
  },
  {
    title: 'E-commerce Platform',
    description: 'A scalable e-commerce platform for retail.',
    image: project3,
    url: 'https://ecommerce.com',
  },
  {
    title: 'iOS App',
    description: 'A native iOS app with seamless UX.',
    image: project4,
    url: 'https://iosapp.com',
  },
  {
    title: 'Android App',
    description: 'A modern Android application.',
    image: project5,
    url: 'https://androidapp.com',
  },
];

const ProjectsCarousel: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
  };

  const handleClose = () => {
    if (activeIndex === null) return;

    const updatedProjects = [...projects];
    const [closedCard] = updatedProjects.splice(activeIndex, 1);
    updatedProjects.push(closedCard);
    setProjects(updatedProjects);
    setActiveIndex(null);
  };

  return (
    <section
    className='shadow'
      style={{

        minHeight: '60vh',
        backgroundColor: 'rgba(1, 1, 64, 0.05)',
        transform: 'skewY(3deg)',
        marginTop: '2.5rem',
        paddingBottom: '8rem',
        marginBottom: '-5rem',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
     
      <div
        style={{
          transform: 'skewY(-3deg)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100%',
          perspective: '1200px',
        }}
      >
          <h2 className="fw-bold title-blue position-relative d-inline-block mb-3 mt-5">
                Our Projects
                <div
                  className="story-underline blue-gradient mt-2 mx-auto mx-md-0"
                  style={{ height: 4, width: 120 }}
                />
              </h2>
        <div
          className="cards-wrapper"
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 400,
          }}
        >
          {projects.map((project, index) => {
            const isActive = index === activeIndex;

            const offset =
              activeIndex !== null
                ? 0
                : (index - Math.floor(projects.length / 2)) * 80;

            if (activeIndex !== null && !isActive) return null;

            return (
              <motion.div
                key={project.title + index}
                onClick={() => handleCardClick(index)}
                style={{
                  width: 600,
                  height: 360,
                  cursor: 'pointer',
                  borderRadius: 15,
                  overflow: 'hidden',
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                  position: 'absolute',
                  zIndex: isActive ? 10 : index,
                  userSelect: 'none',
                }}
                animate={{
                  scale: isActive ? 1.05 : 0.96,
                  translateX: offset,
                  boxShadow: isActive
                    ? '0 10px 40px rgba(0,0,0,0.4)'
                    : 'none',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  layout="responsive"
                  width={600}
                  height={360}
                  style={{
                    objectFit: 'cover',
                    pointerEvents: 'none',
                    borderRadius: '15px 15px 0 0',
                  }}
                  draggable={false}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Active card detail below */}
        <AnimatePresence>
          {activeIndex !== null && (
            <motion.div
              key="project-details"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.4 }}
              style={{
                marginTop: 20,
                textAlign: 'left',
                width: 320,
                position: 'relative',
                color: '#19335d',
                backgroundColor: '#fff',
                borderRadius: 12,
                boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                padding: '20px 25px',
                border: '1px solid #ddd',
              }}
            >
              <button
                onClick={handleClose}
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 12,
                  background: 'none',
                  border: 'none',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  color: '#aaa',
                }}
                aria-label="Close"
              >
                &times;
              </button>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>
                {projects[activeIndex].title}
              </h3>
              <p style={{ fontSize: '0.95rem', color: '#555' }}>
                {projects[activeIndex].description}
              </p>
              <a
                href={projects[activeIndex].url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  marginTop: 10,
                  padding: '8px 16px',
                  backgroundColor: '#19335d',
                  color: 'white',
                  borderRadius: 6,
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                }}
              >
                Visit Project
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <style jsx>
        {`
        .shadow{
          box-shadow:-2px -1rem 1rem rgba(0, 0, 0, 0.15) !important
        }
        `}
      </style>
    </section>
  );
};

export default ProjectsCarousel;
