"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import lamp from "@/public/images/lamp.png";

const LampSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="d-flex flex-column justify-content-center align-items-center bg-light"
      style={{
        padding: "2rem 0rem 5rem", // reduced top padding
        position: "relative",
        background: "linear-gradient(90deg, #f0f4f8 0%, #d9e2ec 100%)",
        height: "63vh",
        paddingTop: " 2rem",
      }}
    >
      {/* Title ABOVE the image */}
      <h2 className="fw-bold title-blue position-relative d-inline-block mb-0">
        Our Vision
        <div
          className="story-underline blue-gradient mt-2 mx-auto mx-md-0"
          style={{ height: 4, width: 120 }}
        />
      </h2>

      {/* Image container */}
      <div
        className="position-relative w-100 d-flex justify-content-center"
        style={{
          transform: "translateX(-1%)",
        }}
      >
        {/* Lamp Image */}
        <div className="lamp-wrapper position-relative">
          {inView && <div className="lamp-yellow-glow" />}
          <Image
            src={lamp}
            alt="Lamp"
            className=" imgg img-fluid"
            priority
            style={{
              height: "393px",
              position: "relative",
              zIndex: 2,
              // maxWidth: "1200px", // Prevents it from getting too wide
            }}
          />
        </div>

        {/* Paragraph text centered INSIDE the lamp image */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center px-3"
          style={{
            pointerEvents: "none",
            zIndex: 3,
          }}
        >
          <div className="lamp-text text-center">
            <p className="lead lamp-paragraph">
              At <span className="highlight-gradient">Leap Tech</span>{" "}
              International, we envision a future where innovation knows no
              boundaries. Our goal is to expand across the region, empowering
              businesses with cutting-edge SaaS, PaaS, and digital solutions
              that drive efficiency, growth, and superior customer experiences.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .vision-title {
          font-family: var(--font-title);
          font-weight: 700;
          font-size: clamp(2rem, 5vw, 4rem);
          line-height: 1.3;
          position: relative;
          display: inline-block;
          color: #fff;
        }

        // .vision-underline {
        //   width: 120px;
        //   height: 4px;
        //   border-radius: 5px;
        //   background: linear-gradient(
        //     90deg,
        //     #fff 0%,
        //     rgba(255, 255, 255, 0.7) 50%,
        //     #ccc 100%
        //   );
        //   animation: underlinePulse 2s infinite ease-in-out;
        //   margin-top: 0.5rem;
        //   transform-origin: center;
        // }

        @keyframes underlinePulse {
          0% {
            transform: scaleX(0);
            opacity: 0.6;
          }
          50% {
            transform: scaleX(1);
            opacity: 1;
          }
          100% {
            transform: scaleX(0);
            opacity: 0.6;
          }
        }

        .lamp-text {
          color: var(--navbar-bg);
          position: absolute;
          top: 50%;
          left: 55%;
          transform: translate(-50%, -50%);
          max-width: 60%;
          width: 50%;
          padding: 0 1rem;
          pointer-events: none;
          text-align: center;
        }

        .lamp-paragraph {
          line-height: 1.5;
          margin: 0;
        }
        @media (max-width: 768px) {
          .lamp-text {
            max-width: 80%;
            padding: 0 1rem;
          }

          .lamp-paragraph {
            font-size: 0.9rem;
          }
          .imgg {
            width: 100%;
          }
        }

        @media (max-width: 680px) {
          .lamp-text {
            max-width: 100% !important;
          }

          .lamp-paragraph {
            font-size: 16px;
          }
        }

        @media (max-width: 480px) {
          .lamp-paragraph {
            width: 100%;
            font-size: 12px;
          }
        }
        @media (min-width: 1400px) {
          .lamp-paragraph {
            font-size: 1.3rem;
          }
        }

        @media (min-width: 1600px) {
          .lamppp {
          }
          .lamp-text {
            left: 60%;
          }

          .lamp-paragraph {
            font-size: 1.4rem;
            width: 80%;
          }
        }
        .title-blue {
          color: var(--navbar-bg);
        }
        .story-underline.blue-gradient {
          background: linear-gradient(
            90deg,
            var(--navbar-bg) 0%,
            rgba(25, 51, 93, 0.7) 50%,
            var(--accent-blue) 100%
          );
        }

        ///////lapm light
        .lamp-wrapper {
          position: relative;
          display: inline-block;
        }

        .lamp-yellow-glow {
          position: absolute;
          top: 27%;
          left: 17%;
          transform: translateY(-50%);
          width: 240px;
          height: 240px;
          background: radial-gradient(
            circle,
            rgb(255 238 120) 0%,
            rgb(255 255 80) 40%,
            rgba(255, 255, 50, 0.2) 70%,
            transparent 90%
          );
          border-radius: 50%;
          pointer-events: none;
          z-index: 1000;
          filter: blur(80px);
          opacity: 0.3;
          animation: blinkGlow 2s infinite ease-in-out;
        }
        

        @keyframes blinkGlow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.9);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @media (max-width: 768px) {
          .lamp-yellow-glow {
          
            width: 140px;
            height: 140px;
            filter: blur(60px);
          }
        }
      `}</style>
    </section>
  );
};

export default LampSection;
// "use client";

// import React, { useState } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const ContactUs = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     subject: "",
//     message: "",
//   });

//   const [status, setStatus] = useState("");
//   const [isTyping, setIsTyping] = useState(false);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//     setIsTyping(true);
//   };

//   const handleBlur = () => setIsTyping(false);
//   const handleFocus = () => setIsTyping(true);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
  
//     try {
//       const res = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_URL}/contact/`,
//         formData
//       );
  
//       if (res.status === 201) {
//         toast.success("Your message has been sent!", {
//           position: "bottom-center",
//           theme: "colored",
//         });
//         if (res.status === 201) {
//           setStatus("Your message has been sent!");
//           // ...
//         } else {
//           setStatus("Something went wrong. Please try again.");
//         }
//         setFormData({
//           name: "",
//           email: "",
//           phone: "",
//           subject: "",
//           message: "",
//         });
//       } else {
//         toast.error("Something went wrong. Please try again.", {
//           position: "bottom-center",
//           theme: "colored",
//         });
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Submission failed. Please try again.", {
//         position: "bottom-center",
//         theme: "colored",
//       });
//     }
//   };
  

//   return (
//     <section
//       className="container-fluid contact-section py-5"
//       style={{
//         background: "linear-gradient(90deg, #f0f4f8 0%, #d9e2ec 100%)",
//         minHeight: "70vh",
//       }}
//     >
//       <div className="container">
//         <h2 className="contact-title mb-4 text-center">
//           Contact Us
//           <div
//             className={`underline-gradient mx-auto mt-1 ${
//               isTyping ? "paused" : ""
//             }`}
//           ></div>
//         </h2>

//         <div className="row g-4">
//           {/* Left Side */}
//           <div className="col-md-6">
//             <iframe
//               title="Company Location"
//               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27824.723435077165!2d48.050615590253756!3d29.338345468318447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fcf9d12012035db%3A0xe2e2beccf86b9570!2sOmniya%20Shopping%20Center!5e0!3m2!1sen!2slb!4v1753365228687!5m2!1sen!2slb"
//               width="100%"
//               height="300"
//               style={{ border: 0, borderRadius: "10px" }}
//               allowFullScreen
//               loading="eager" // 👈 replaces "lazy"
//               referrerPolicy="no-referrer-when-downgrade"
            
//             ></iframe>

//             <h5 style={{ color: "var(--navbar-bg)", marginTop: "1.5rem" }}>
//               Office Location
//             </h5>
//             <p style={{ color: "#4a4a4a" }}>
//               123 Leap Tech Street, Kuwait City, Kuwait
//             </p>

//             <h5 style={{ color: "var(--navbar-bg)" }}>Email</h5>
//             <p>
//               <a
//                 href="mailto:info@leaptechkw.com"
//                 style={{ color: "#4a4a4a", textDecoration: "underline" }}
//               >
//                 info@leaptechkw.com
//               </a>
//             </p>

//             <h5 style={{ color: "var(--navbar-bg)" }}>Phone</h5>
//             <p>
//               <a
//                 href="tel:+96525713432"
//                 style={{ color: "#4a4a4a", textDecoration: "underline" }}
//               >
//                 +965 2571 3432
//               </a>
//             </p>
//           </div>

//           {/* Right: Form */}
//           <div className="col-md-6">
//             <form onSubmit={handleSubmit}>
//               <div className="mb-3">
//                 <label htmlFor="name">Your Name</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   onFocus={handleFocus}
//                   onBlur={handleBlur}
//                   required
//                 />
//               </div>

//               <div className="mb-3">
//                 <label htmlFor="email">Your Email</label>
//                 <input
//                   type="email"
//                   className="form-control"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   onFocus={handleFocus}
//                   onBlur={handleBlur}
//                   required
//                 />
//               </div>

//               <div className="mb-3">
//                 <label htmlFor="phone">Phone</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="phone"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="mb-3">
//                 <label htmlFor="subject">Subject</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="subject"
//                   name="subject"
//                   value={formData.subject}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="mb-3">
//                 <label htmlFor="message">Your Message</label>
//                 <textarea
//                   className="form-control"
//                   id="message"
//                   name="message"
//                   rows={5}
//                   value={formData.message}
//                   onChange={handleChange}
//                   required
//                 ></textarea>
//               </div>

//               <button type="submit" className="btn btn-primary">
//                 Send Message
//               </button>

//               {status && (
//                 <p className="mt-3" style={{ color: "var(--navbar-bg)" }}>
//                   {status}
//                 </p>
//               )}
//             </form>
//           </div>
//         </div>
//       </div>

//       {/* CSS */}
//       <style jsx>{`
//         .contact-title {
//           font-size: clamp(2.25rem, 5vw, 4.5rem);
//           font-weight: 700;
//           font-family: var(--font-title);
//           color: var(--navbar-bg);
//           position: relative;
//         }
//         .underline-gradient {
//           width: 120px;
//           height: 4px;
//           border-radius: 5px;
//           background: linear-gradient(
//             90deg,
//             var(--navbar-bg) 0%,
//             rgba(25, 51, 93, 0.7) 50%,
//             var(--accent-blue) 100%
//           );
//           animation: underlinePulse 2s infinite ease-in-out;
//           transform-origin: center;
//         }
//         .paused {
//           animation-play-state: paused;
//         }
//         @keyframes underlinePulse {
//           0% {
//             transform: scaleX(0);
//             opacity: 0.6;
//           }
//           50% {
//             transform: scaleX(1);
//             opacity: 1;
//           }
//           100% {
//             transform: scaleX(0);
//             opacity: 0.6;
//           }
//         }
//         input.form-control,
//         textarea.form-control {
//           border-radius: 8px;
//           border: 1px solid #ccc;
//           padding: 0.5rem 1rem;
//         }
//         button.btn-primary {
//           background: var(--navbar-bg);
//           border: none;
//           padding: 0.6rem 1.5rem;
//           font-weight: 600;
//           transition: background-color 0.3s ease;
//           border-radius: 8px;
//         }
//         button.btn-primary:hover {
//           background-color: var(--accent-blue);
//         }
//       `}</style>
//       <ToastContainer />

//     </section>
//   );
// };

// export default ContactUs;
