"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

interface Project {
  _id: string;
  title: string;
  description: string;
  url: string;
  image: string;
}

interface Props {
  categoryTitle: string;
}

const ProjectServiceCarousel: React.FC<Props> = ({ categoryTitle }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!categoryTitle) return;
    setLoading(true);
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/category/title/${encodeURIComponent(
          categoryTitle
        )}`
      )
      .then((res) => setProjects(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [categoryTitle]);

  const handleCardClick = (index: number) => setActiveIndex(index);
  const handleClose = () => setActiveIndex(null);

  if (loading)
    return <p style={{ textAlign: "center" }}>Loading projects...</p>;
  if (!projects.length) return null;

  const isSmallScreen = windowWidth < 768;
  const isMediumScreen = windowWidth >= 768 && windowWidth < 1000;
  const isWideScreen = windowWidth >= 1200;

  return (
    <section
      className="shadow"
      style={{
        minHeight: "60vh",
        backgroundColor: "rgba(1, 1, 64, 0.05)",
        transform: "skewY(3deg)",
        marginTop: "2.5rem",
        paddingBottom: "8rem",
        marginBottom: "-5rem",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          transform: "skewY(-3deg)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100%",
          perspective: isWideScreen ? "1200px" : "none",
        }}
      >
        <h2 className="fw-bold title-blue position-relative d-inline-block mb-3 mt-5">
          Projects Related to {categoryTitle}
          <div
            className="story-underline blue-gradient mt-2 mx-auto mx-md-0"
            style={{ height: 4, width: 120 }}
          />
        </h2>

        {/* Show carousel only if no active project */}
        {activeIndex === null && (
          <div
            className="cards-wrapper"
            style={{
              position: "relative",
              display: "flex",
              flexWrap: isWideScreen ? "nowrap" : "wrap",
              justifyContent: "center",
              alignItems: "stretch",
              gap: isWideScreen ? 0 : "1.5rem",
              width: "100%",
              padding: "1rem",
              height: isWideScreen ? 420 : "auto",
            }}
          >
            {projects.map((project, index) => {
              const offset =
                isWideScreen && activeIndex === null
                  ? (index - Math.floor(projects.length / 2)) * 80
                  : 0;

              return (
                <motion.div
                key={project._id}
                onClick={() => handleCardClick(index)}
                style={{
                  width: isSmallScreen ? "100%" : isMediumScreen ? "45%" : 600,
                  height: isWideScreen ? 400 : 200,
                  position: isWideScreen ? "absolute" : "relative",
                  borderRadius: 15,
                  overflow: "hidden",
                  cursor: "pointer",
                }}
                animate={{
                  translateX: offset,
                  scale: 0.96,
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/images/${project.image}`}
                  alt={project.title}
                  fill
                  style={{ objectFit: "cover", pointerEvents: "none" }}
                  draggable={false}
                />
              </motion.div>
              
              );
            })}
          </div>
        )}

        {/* Show single full card if project is active */}
        <AnimatePresence>
          {activeIndex !== null && (
            <motion.div
              key="active-project"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.4 }}
              style={{
                marginTop: 30,
                textAlign: "left",
                width: isSmallScreen ? "95%" : "70%",
                maxWidth: 900,
                backgroundColor: "#fff",
                borderRadius: 15,
                boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
                padding: "25px",
                border: "1px solid #ddd",
                position: "relative",
              }}
            >
              <button
                onClick={handleClose}
                style={{
                  position: "absolute",
                  top: "0px",
                  right: "0.2rem",
                  background: "none",
                  border: "none",
                  fontSize: "1.75rem",
                  cursor: "pointer",
                  color: "rgb(229 11 23)",
                }}
                aria-label="Close"
              >
                &times;
              </button>

              <div style={{ marginBottom: 20 }}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/images/${projects[activeIndex].image}`}
                  alt={projects[activeIndex].title}
                  width={800}
                  height={260}
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    borderRadius: 10,
                  }}
                />
              </div>

              <h3 style={{ fontSize: "1.6rem", marginBottom: "0.5rem" }}>
                {projects[activeIndex].title}
              </h3>
              <p style={{ fontSize: "1rem", color: "#555" }}>
                {projects[activeIndex].description}
              </p>
              <a
                href={projects[activeIndex].url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: 15,
                  padding: "10px 20px",
                  backgroundColor: "#19335d",
                  color: "white",
                  borderRadius: 8,
                  textDecoration: "none",
                  fontSize: "1rem",
                }}
              >
                Visit Project
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        .shadow {
          box-shadow: -2px -1rem 1rem rgba(0, 0, 0, 0.15) !important;
        }
      `}</style>
    </section>
  );
};

export default ProjectServiceCarousel;
