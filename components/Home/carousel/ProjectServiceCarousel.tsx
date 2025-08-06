
// "use client";

// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";
// import type { StaticImageData } from "next/image";

// import xtream from "@/public/images/xtreme.png";
// import leap from "@/public/images/leap.png";
// import ZeedlyApp from "@/public/images/zeedly.png";
// import SubahAlSalemCOApp from "@/public/images/subahSalamApp.png";
// import DeliverySystem from "@/public/images/deliverySystem.png";
// import MyHomeKW from "@/public/images/MyHome.png";
// import HRSystem from "@/public/images/zentra.png";

// interface Project {
//   title: string;
//   description: string;
//   url: string;
//   image: StaticImageData;
// }

// const initialProjects: Project[] = [
//   {
//     title: "KWXtrem store ",
//     description: "A professional website for Company with custom CMS.",
//     image: xtream,
//     url: "https://kw.xtremestorekw.com",
//   },
//   {
//     title: "",
//     description: "IT Company website optimized for service presentation.",
//     image: leap,
//     url: "https://leaptechkw.com/",
//   },
//   {
//     title: "Zeedly App",
//     description: "A scalable e-commerce platform for retail.",
//     image: ZeedlyApp,
//     url: "https://apps.apple.com/app/id6472618232",
//   },
//   {
//     title: "Subah Al Salem CO. App",
//     description: "A native iOS app with seamless UX.",
//     image: SubahAlSalemCOApp,
//     url: "https://apps.apple.com/app/id6502917258",
//   },
//   {
//     title: "Delivery System",
//     description: "A modern Android application.",
//     image: DeliverySystem,
//     url: "leaptogokw.com/login",
//   },
//   {
//     title: "MyHomeKW",
//     description: "A modern Android application.",
//     image: MyHomeKW,
//     url: "https://myhomekw.com",
//   },
//   {
//     title: "HR System",
//     description: "A modern Android application.",
//     image: HRSystem,
//     url: "https://zentrahr.com/login",
//   },
// ];

// const ProjectsCarousel: React.FC = () => {
//   const [projects, setProjects] = useState<Project[]>(initialProjects);
//   const [activeIndex, setActiveIndex] = useState<number | null>(null);
//   const [windowWidth, setWindowWidth] = useState<number>(0);

//   useEffect(() => {
//     function handleResize() {
//       setWindowWidth(window.innerWidth);
//     }
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const isSmallScreen = windowWidth < 768; // mobile
//   const isMediumScreen = windowWidth >= 768 && windowWidth < 1200; // tablet

//   const handleCardClick = (index: number) => {
//     setActiveIndex(index);
//   };

//   const handleClose = () => {
//     if (activeIndex === null) return;

//     const updatedProjects = [...projects];
//     const [closedCard] = updatedProjects.splice(activeIndex, 1);
//     updatedProjects.push(closedCard);
//     setProjects(updatedProjects);
//     setActiveIndex(null);
//   };

//   return (
//     <section
//       className="shadow"
//       style={{
//         minHeight: "60vh",
//         backgroundColor: "rgba(1, 1, 64, 0.05)",
//         transform: "skewY(3deg)",
//         marginTop: "2.5rem",
//         paddingBottom: "8rem",
//         marginBottom: "-5rem",
//         overflow: "hidden",
//         position: "relative",
//       }}
//     >
//       <div
//         style={{
//           transform: "skewY(-3deg)",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           minHeight: "100%",
//           perspective: "1200px",
//         }}
//       >
//         <h2 className="fw-bold title-blue position-relative d-inline-block mb-3 mt-5">
//           Our Projects
//           <div
//             className="story-underline blue-gradient mt-2 mx-auto mx-md-0"
//             style={{ height: 4, width: 120 }}
//           />
//         </h2>

//         {/* Cards container */}
//         <div
//           className="cards-wrapper"
//           style={{
//             position: "relative",
//             display: isSmallScreen ? "block" : isMediumScreen ? "flex" : "flex",
//             justifyContent: isSmallScreen ? "initial" : "center",
//             alignItems: "center",
//             gap: isSmallScreen ? "1.5rem" : "2rem",
//             height: isSmallScreen || isMediumScreen ? "auto" : 400,
//             flexWrap: isMediumScreen ? "wrap" : "nowrap",
//           }}
//         >
//           {projects.map((project, index) => {
//             const isActive = index === activeIndex;

//             if (activeIndex !== null && !isActive) return null;

//             // Calculate offset only for large screen carousel
//             const offset =
//               !isSmallScreen && !isMediumScreen && activeIndex === null
//                 ? (index - Math.floor(projects.length / 2)) * 80
//                 : 0;

//             return (
//               <motion.div
//                 key={project.title + index}
//                 onClick={() => handleCardClick(index)}
//                 style={{
//                   width: isSmallScreen ? "100%" : isMediumScreen ? "45%" : 600,
//                   height: isSmallScreen || isMediumScreen ? 'auto' : 400,
//                   position:
//                     isSmallScreen || isMediumScreen ? "relative" : "absolute",
//                   borderRadius: 15,
//                   overflow: 'visible',
//                   marginBottom: '2rem',
                  
//                   backgroundColor: "white",
//                   border: "1px solid #ccc",
//                   cursor: "pointer",
//                   userSelect: "none",
//                   boxShadow: isActive ? "0 10px 40px rgba(0,0,0,0.4)" : "none",
//                   scale: isActive ? 1.05 : 0.96,
//                   translateX: offset,
//                   aspectRatio: isSmallScreen ? "16/9" : undefined, // optional
//                 }}
//                 animate={{
//                   scale: isActive ? 1.05 : 0.96,
//                   translateX: offset,
//                   boxShadow: isActive ? "0 10px 40px rgba(0,0,0,0.4)" : "none",
//                 }}
//                 transition={{ type: "spring", stiffness: 300, damping: 25 }}
//               >
// <div
//   style={{
//     position: "relative",
//     width: "100%",
//     height: "100%",
//     borderRadius: "15px 15px 0 0",
//     overflow: "hidden",
//   }}
// >
//   <Image
//     src={project.image}
//     alt={project.title}
//     fill
//     style={{
//       objectFit: "cover",
//       pointerEvents: "none",
//     }}
//     draggable={false}
//   />
// </div>


               
//               </motion.div>
//             );
//           })}
//         </div>

//         {/* Active card detail below */}
//         <AnimatePresence>
//           {activeIndex !== null && (
//             <motion.div
//               key="project-details"
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 30 }}
//               transition={{ duration: 0.4 }}
//               style={{
//                 marginTop: 20,
//                 textAlign: "left",
//                 width: isSmallScreen ? "90%" : 320,
//                 position: "relative",
//                 color: "#19335d",
//                 backgroundColor: "#fff",
//                 borderRadius: 12,
//                 boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
//                 padding: "20px 25px",
//                 border: "1px solid #ddd",
//               }}
//             >
//               <button
//                 onClick={handleClose}
//                 style={{
//                   position: "absolute",
//                   top: 10,
//                   right: 12,
//                   background: "none",
//                   border: "none",
//                   fontSize: "1.2rem",
//                   cursor: "pointer",
//                   color: "#aaa",
//                 }}
//                 aria-label="Close"
//               >
//                 &times;
//               </button>
//               <h3 style={{ fontSize: "1.4rem", marginBottom: "0.5rem" }}>
//                 {projects[activeIndex].title}
//               </h3>
//               <p style={{ fontSize: "0.95rem", color: "#555" }}>
//                 {projects[activeIndex].description}
//               </p>
//               <a
//                 href={projects[activeIndex].url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 style={{
//                   display: "inline-block",
//                   marginTop: 10,
//                   padding: "8px 16px",
//                   backgroundColor: "#19335d",
//                   color: "white",
//                   borderRadius: 6,
//                   textDecoration: "none",
//                   fontSize: "0.9rem",
//                 }}
//               >
//                 Visit Project
//               </a>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       <style jsx>{`
//         .shadow {
//           box-shadow: -2px -1rem 1rem rgba(0, 0, 0, 0.15) !important;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default ProjectsCarousel;
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { StaticImageData } from "next/image";

import xtream from "@/public/images/xtreme.png";
import leap from "@/public/images/leap.png";
import ZeedlyApp from "@/public/images/zeedly.png";
import SubahAlSalemCOApp from "@/public/images/subahSalamApp.png";
import DeliverySystem from "@/public/images/deliverySystem.png";
import MyHomeKW from "@/public/images/MyHome.png";
import HRSystem from "@/public/images/zentra.png";

interface Project {
  title: string;
  description: string;
  url: string;
  image: StaticImageData;
}

const initialProjects: Project[] = [
  {
    title: "KWXtrem store ",
    description: "A professional website for Company with custom CMS.",
    image: xtream,
    url: "https://kw.xtremestorekw.com",
  },
  {
    title: "",
    description: "IT Company website optimized for service presentation.",
    image: leap,
    url: "https://leaptechkw.com/",
  },
  {
    title: "Zeedly App",
    description: "A scalable e-commerce platform for retail.",
    image: ZeedlyApp,
    url: "https://apps.apple.com/app/id6472618232",
  },
  {
    title: "Subah Al Salem CO. App",
    description: "A native iOS app with seamless UX.",
    image: SubahAlSalemCOApp,
    url: "https://apps.apple.com/app/id6502917258",
  },
  {
    title: "Delivery System",
    description: "A modern Android application.",
    image: DeliverySystem,
    url: "leaptogokw.com/login",
  },
  {
    title: "MyHomeKW",
    description: "A modern Android application.",
    image: MyHomeKW,
    url: "https://myhomekw.com",
  },
  {
    title: "HR System",
    description: "A modern Android application.",
    image: HRSystem,
    url: "https://zentrahr.com/login",
  },
];

const ProjectsCarousel: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isSmallScreen = windowWidth < 768;
  const isMediumScreen = windowWidth >= 768 && windowWidth < 1200;

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
          perspective: "1200px",
        }}
      >
        <h2 className="fw-bold title-blue position-relative d-inline-block mb-3 mt-5">
          Our Projects
          <div
            className="story-underline blue-gradient mt-2 mx-auto mx-md-0"
            style={{ height: 4, width: 120 }}
          />
        </h2>

        {/* Cards container */}
        <div
          className="cards-wrapper"
          style={{
            position: "relative",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "stretch",
            gap: "2rem",
            width: "100%",
            padding: "1rem",
          }}
        >
          {projects.map((project, index) => {
            const isActive = index === activeIndex;

            if (activeIndex !== null && !isActive) return null;

            return (
              <motion.div
                key={project.title + index}
                onClick={() => handleCardClick(index)}
                style={{
                  width: isSmallScreen
                    ? "100%"
                    : isMediumScreen
                    ? "45%"
                    : "30%",
                  aspectRatio: "16 / 9", // maintain consistent image ratio
                  position: "relative",
                  borderRadius: 15,
                  overflow: "hidden",
                  backgroundColor: "white",
                  border: "1px solid #ccc",
                  cursor: "pointer",
                  userSelect: "none",
                  boxShadow: isActive ? "0 10px 40px rgba(0,0,0,0.4)" : "none",
                }}
                animate={{
                  scale: isActive ? 1.05 : 0.98,
                  boxShadow: isActive ? "0 10px 40px rgba(0,0,0,0.4)" : "none",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <div style={{ position: "relative", width: "100%", height: "100%" }}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    style={{
                      objectFit: "cover",
                      pointerEvents: "none",
                    }}
                    draggable={false}
                  />
                </div>
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
                textAlign: "left",
                width: isSmallScreen ? "90%" : 320,
                position: "relative",
                color: "#19335d",
                backgroundColor: "#fff",
                borderRadius: 12,
                boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                padding: "20px 25px",
                border: "1px solid #ddd",
              }}
            >
              <button
                onClick={handleClose}
                style={{
                  position: "absolute",
                  top: 10,
                  right: 12,
                  background: "none",
                  border: "none",
                  fontSize: "1.2rem",
                  cursor: "pointer",
                  color: "#aaa",
                }}
                aria-label="Close"
              >
                &times;
              </button>
              <h3 style={{ fontSize: "1.4rem", marginBottom: "0.5rem" }}>
                {projects[activeIndex].title}
              </h3>
              <p style={{ fontSize: "0.95rem", color: "#555" }}>
                {projects[activeIndex].description}
              </p>
              <a
                href={projects[activeIndex].url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: 10,
                  padding: "8px 16px",
                  backgroundColor: "#19335d",
                  color: "white",
                  borderRadius: 6,
                  textDecoration: "none",
                  fontSize: "0.9rem",
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

export default ProjectsCarousel;
