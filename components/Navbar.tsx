
// "use client";
// import { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import logo from "@/public/images/logoLeapTech.png";
// import PrimaryButton from "./ui/PrimaryButton";
// interface NavbarProps {
//   onHeightChange: (height: number) => void;
// }

// const Navbar: React.FC<NavbarProps> = ({ onHeightChange }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isVisible, setIsVisible] = useState(true);
//   const lastScrollY = useRef(0);

//   const navRef = useRef<HTMLElement>(null);
//   const [navHeight, setNavHeight] = useState(0);

//   useEffect(() => {
//     // Update navbar height on mount and on window resize
//     const updateHeight = () => {
//       if (navRef.current) {
//         setNavHeight(navRef.current.offsetHeight);
//         onHeightChange(navRef.current.offsetHeight);

//       }
//     };

//     updateHeight();
//     window.addEventListener("resize", updateHeight);
//     return () => window.removeEventListener("resize", updateHeight);
//   }, [onHeightChange]);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > lastScrollY.current && window.scrollY > 100) {
//         setIsVisible(false);
//       } else {
//         setIsVisible(true);
//       }
//       lastScrollY.current = window.scrollY;
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

//   return (
//     <nav
//     ref={navRef}

//       className={`navbar fixed-top shadow px-4 py-3 ${
//         isVisible ? "translate-none" : "translate-up"
//       }`}
//       style={{
//         backgroundColor: "#003366", // Deep Blue background
//         transition: "transform 0.3s ease",
//         height: "10vh",
//         zIndex: 1030,
//       }}
//     >
//       <div
//         className="container d-flex align-items-center justify-content-between"
//         style={{ height: "100%", alignContent: "center" }}
//       >
//         <div>
//           <Link href="/" legacyBehavior>
//             <a className="navbar-brand d-flex align-items-center">
//               <Image
//                 src={logo}
//                 alt="Logo"
//                 height={56}
//                 width={56}
//                 quality={100}
//                 priority
//               />
//             </a>
//           </Link>
//         </div>

//         {/* Nav links with underline animation */}
//         <div
//           className="d-none d-lg-flex gap-5 fw-medium mx-auto rounded px-4 py-2"
//           style={{ backgroundColor: "#003366" }}
//         >
//           <Link href="/" legacyBehavior>
//             <a className="nav-link underline-anim">HOME</a>
//           </Link>
//           <Link href="/about" legacyBehavior>
//             <a className="nav-link underline-anim">ABOUT US</a>
//           </Link>
//           <Link href="/services" legacyBehavior>
//             <a className="nav-link underline-anim">SERVICE</a>
//           </Link>
//           <Link href="/contact" legacyBehavior>
//             <a className="nav-link underline-anim">CONTACT US</a>
//           </Link>
//         </div>

//         {/* Language switch and Contact button */}
//         <div className="d-none d-lg-flex align-items-center gap-3">
//           <button
//             type="button"
//             className="language-switch underline-anim"
//             onClick={() => alert("Switch to Arabic")}
//             aria-label="Switch language to Arabic"
//           >
//             اللغة العربية
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="20"
//               height="20"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="1.5"
//               viewBox="0 0 24 24"
//               style={{ marginLeft: "6px" }}
//             >
//               <circle cx="12" cy="12" r="10" />
//               <path d="M2 12h20" />
//               <path d="M12 2a15 15 0 0 1 0 20" />
//               <path d="M7 4a15 15 0 0 1 0 16" />
//               <path d="M17 4a15 15 0 0 0 0 16" />
//             </svg>
//           </button>

//           <Link href="/career" legacyBehavior>
//             <a>
//               <button
//                 className="btn career-button px-4 py-2"
//                 style={{ color: "#003366" }}
//               >
//                 CAREER
//               </button>
//             </a>
//           </Link>
//         </div>

//         {/* Mobile menu toggle button */}
        // <button
        //   className="btn d-lg-none border-0"
        //   onClick={toggleMenu}
        //   aria-label="Toggle Menu"
        //   style={{ color: "white" }} // plain white hamburger lines
        //   type="button"
        // >
        //   <svg
        //     xmlns="http://www.w3.org/2000/svg"
        //     width="28"
        //     height="28"
        //     fill="currentColor" // white because parent color
        //     className="bi bi-list"
        //     viewBox="0 0 16 16"
        //   >
        //     <path
        //       fillRule="evenodd"
        //       d="M2.5 12.5a.5.5 0 010-1h11a.5.5 0 010 1h-11zm0-4a.5.5 0 010-1h11a.5.5 0 010 1h-11zm0-4a.5.5 0 010-1h11a.5.5 0 010 1h-11z"
        //     />
        //   </svg>
        // </button>
//       </div>

//       {/* Mobile menu */}
//       {isMenuOpen && (
//         <div
//         className="d-lg-none position-fixed w-100 start-0 mobile-menu-animated"
//     style={{
//       top: `${navHeight}px`, // dynamic navbar height
//       background: "linear-gradient(to left, #ffffff, #f0f4f8)",
//       zIndex: 1029,
//       padding: "2rem 1rem",
//       borderBottomLeftRadius: "12px",
//       borderBottomRightRadius: "12px",
//       boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
//     }}
//         >
//           <div className="d-flex flex-column align-items-center gap-4">
//             <Link href="/" legacyBehavior>
//               <a onClick={toggleMenu} className="text-primary fw-semibold fs-5">
//                 HOME
//               </a>
//             </Link>
//             <Link href="/about" legacyBehavior>
//               <a onClick={toggleMenu} className="text-primary fw-semibold fs-5">
//                 ABOUT US
//               </a>
//             </Link>
//             <Link href="/services" legacyBehavior>
//               <a
//                 onClick={toggleMenu}
//                 className="text-primary fw-semibold fs-5"
//               >
//                 SERVICE
//               </a>
//             </Link>
//             <Link href="/contact" legacyBehavior>
//               <a
//                 onClick={toggleMenu}
//                 className="text-primary fw-semibold fs-5"
//               >
//                 CONTACT US
//               </a>
//             </Link>

//             <Link href="/career" legacyBehavior>
//               <a>
//                 <PrimaryButton className="primary-button mt-4">
//                   CAREER
//                 </PrimaryButton>
//               </a>
//             </Link>
//           </div>
//         </div>
//       )}

//       {/* CSS */}
//            <style jsx>{`
// /* Career button with smooth left-to-right gradient background on hover */
// .career-button {
//   position: relative;
//   background-color: white; /* pure white normal */
//   border: 1px solid white;
//   color: #003366;
//   font-weight: 500;
//   cursor: pointer;
//   overflow: hidden;
//   transition: color 0.6s ease;
//   z-index: 0;
// }

// /* The animated gradient background is on ::before, initially hidden */
// .career-button::before {
//   content: "";
//   position: absolute;
//   inset: 0; /* top:0; left:0; right:0; bottom:0 */
//   background: linear-gradient(90deg, #003366 0%, white 50%, #003366 100%);
//   background-size: 200% 100%;
//   background-position: 100% 0;
//   transition: background-position 0.6s ease;
//   z-index: -1; /* behind text */
//   border-radius: inherit;
//   opacity: 0; /* invisible normally */
// }

// /* On hover, show and animate the gradient sliding left to right */
// .career-button:hover::before {
//   opacity: 1;
//   background-position: 0 0;
// }

// .career-button:hover {
//   color: #003366;
// }




// .d-lg-none a {
//   color: #003366 !important; /* Blue */
//   text-decoration: none;
// }
//         .translate-none {
//           transform: translateY(0);
//         }
//         .translate-up {
//           transform: translateY(-100%);
//         }

//         .nav-link{
//           font-weight: 500;
//           padding: 6px 12px; /* consistent vertical padding */
//           line-height: 1.5;
//           color: white;
//           text-decoration: none;
//           position: relative;
//           cursor: pointer;
//           display: inline-flex;
//           align-items: center;
//           height: 40px; /* fix height for all nav links */
//         }
        
  
        
//         /* Underline animation for both */
//         .nav-link::after,
//  {
//           content: "";
//           position: absolute;
//           bottom: 0;
//           left: 0;
//           height: 3px;
//           width: 0;
//           border-radius: 2px;
//           background: linear-gradient(90deg, #003366 0%, white 50%, #003366 100%);
//           transition: width 0.4s ease;
//         }
        
//         .nav-link:hover::after{
//           width: 100%;
//         }
        

//         /* Underline animation */
//         .underline-anim::after {
//           content: "";
//           position: absolute;
//           bottom: 0;
//           left: 0;
//           height: 3px;
//           width: 0%;
//           border-radius: 2px;
//           background: linear-gradient(
//             90deg,
//             #003366 0%,
//             white 50%,
//             #003366 100%
//           );
//           transition: width 0.4s ease;
//         }
//         .underline-anim:hover::after {
//           width: 100%;
//         }

   
     
       
//         /* Language switch button style */
//         .language-switch {
//           background: none;
//           border: none;
//           cursor: pointer;
//           color: white;
//           font-weight: 500;
//           position: relative;
//           padding-bottom: 4px;
//           display: flex;
//           align-items: center;
//           text-decoration: none;
//         }
//         .language-switch::after {
//           content: "";
//           position: absolute;
//           bottom: 0;
//           left: 0;
//           height: 3px;
//           width: 0;
//           border-radius: 2px;
//           background: linear-gradient(
//             90deg,
//             #003366 0%,
//             white 50%,
//             #003366 100%
//           );
//           transition: width 0.4s ease;
//         }
//         .language-switch:hover::after {
//           width: 100%;
//         }

//         @keyframes fadeSlideDown {
//           0% {
//             opacity: 0;
//             transform: translateY(-20px);
//           }
//           100% {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         /* Animate the container wrapping the mobile links */
//         .mobile-menu-animated {
//           animation: fadeSlideDown 0.5s ease forwards;
//         }
        
//       `}</style>
//     </nav>
//   );
// };

// export default Navbar;
"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/logoLeapTech.png";
import PrimaryButton from "./ui/PrimaryButton";

interface NavbarProps {
  onHeightChange: (height: number) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onHeightChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [language, setLanguage] = useState<"EN" | "AR">("EN");

  const lastScrollY = useRef(0);
  const navRef = useRef<HTMLElement>(null);
  const [navHeight, setNavHeight] = useState(0);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleLanguage = () => {
    const newLang = language === "EN" ? "AR" : "EN";
    setLanguage(newLang);
  };

  useEffect(() => {
    const updateHeight = () => {
      if (navRef.current) {
        setNavHeight(navRef.current.offsetHeight);
        onHeightChange(navRef.current.offsetHeight);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [onHeightChange]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current && window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`navbar fixed-top shadow px-4 py-3 ${
        isVisible ? "translate-none" : "translate-up"
      }`}
      style={{
        backgroundColor: "#003366",
        transition: "transform 0.3s ease",
        height: "10vh",
        zIndex: 1030,
      }}
    >
<div className="container d-flex align-items-center justify-content-between w-100">
  {/* Left side: Small logo (responsive) */}
  <div className="d-flex align-items-center">
    <Link href="/" legacyBehavior>
      <a className="navbar-brand d-flex align-items-center">
        <Image
          src={logo}
          alt="Logo"
          height={32}
          width={32}
          quality={100}
          priority
          className="d-lg-none" // hide on large
        />
        <Image
          src={logo}
          alt="Logo"
          height={56}
          width={56}
          quality={100}
          priority
          className="d-none d-lg-inline" // show only on large
        />
      </a>
    </Link>
  </div>

  {/* Desktop nav center (already in your code) */}
  <div
    className="d-none d-lg-flex gap-5 fw-medium"
    style={{ flex: 1, justifyContent: "center" }}
  >
    <Link href="/" legacyBehavior>
      <a className="nav-link underline-anim">HOME</a>
    </Link>
    <Link href="/about" legacyBehavior>
      <a className="nav-link underline-anim">ABOUT US</a>
    </Link>
    <Link href="/services" legacyBehavior>
      <a className="nav-link underline-anim">SERVICE</a>
    </Link>
    <Link href="/contact" legacyBehavior>
      <a className="nav-link underline-anim">CONTACT US</a>
    </Link>
  </div>

  {/* Desktop right buttons */}
  <div className="d-none d-lg-flex align-items-center gap-3">
    <Link href="/career" legacyBehavior>
      <a>
        <button className="btn career-button px-4 py-2" style={{ color: "#003366" }}>
          CAREER
        </button>
      </a>
    </Link>

    <button
      onClick={toggleLanguage}
      className="lang-toggle-btn fw-semibold"
      aria-label="Toggle language"
    >
      {language}
    </button>
  </div>

  {/* Mobile: Language toggle + Hamburger */}
  <div className="d-flex d-lg-none align-items-center gap-2 ms-auto">
    {/* Language toggle (same size as hamburger) */}
    <button
      onClick={toggleLanguage}
      className="lang-icon-btn"
      aria-label="Toggle language"
    >
      {language}
    </button>

    {/* Hamburger */}
    <button
      className="btn border-0"
      onClick={toggleMenu}
      aria-label="Toggle Menu"
      style={{ color: "white" }}
      type="button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        fill="currentColor"
        className="bi bi-list"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M2.5 12.5a.5.5 0 010-1h11a.5.5 0 010 1h-11zm0-4a.5.5 0 010-1h11a.5.5 0 010 1h-11zm0-4a.5.5 0 010-1h11a.5.5 0 010 1h-11z"
        />
      </svg>
    </button>
  </div>
</div>


      {/* Mobile menu */}
      {isMenuOpen && (
        <div
          className="d-lg-none position-fixed w-100 start-0 mobile-menu-animated"
          style={{
            top: `${navHeight}px`,
            background: "linear-gradient(to left, #ffffff, #f0f4f8)",
            zIndex: 1029,
            padding: "2rem 1rem",
            borderBottomLeftRadius: "12px",
            borderBottomRightRadius: "12px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          }}
        >
          <div className="d-flex flex-column align-items-center gap-4">
            <Link href="/" legacyBehavior>
              <a onClick={toggleMenu} className="text-primary fw-semibold fs-5">
                HOME
              </a>
            </Link>
            <Link href="/about" legacyBehavior>
              <a onClick={toggleMenu} className="text-primary fw-semibold fs-5">
                ABOUT US
              </a>
            </Link>
            <Link href="/services" legacyBehavior>
              <a
                onClick={toggleMenu}
                className="text-primary fw-semibold fs-5"
              >
                SERVICE
              </a>
            </Link>
            <Link href="/contact" legacyBehavior>
              <a
                onClick={toggleMenu}
                className="text-primary fw-semibold fs-5"
              >
                CONTACT US
              </a>
            </Link>
            <Link href="/career" legacyBehavior>
              <a>
                <PrimaryButton className="primary-button mt-4">
                  CAREER
                </PrimaryButton>
              </a>
            </Link>
          </div>
        </div>
      )}

      {/* STYLES */}
      <style jsx>{`
        .career-button {
          position: relative;
          background-color: white;
          border: 1px solid white;
          color: #003366;
          font-weight: 500;
          cursor: pointer;
          overflow: hidden;
          transition: color 0.6s ease;
          z-index: 0;
        }

        .career-button::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, #003366 0%, white 50%, #003366 100%);
          background-size: 200% 100%;
          background-position: 100% 0;
          transition: background-position 0.6s ease;
          z-index: -1;
          border-radius: inherit;
          opacity: 0;
        }

        .career-button:hover::before {
          opacity: 1;
          background-position: 0 0;
        }

        .career-button:hover {
          color: #003366;
        }

        .d-lg-none a {
          color: #003366 !important;
          text-decoration: none;
        }

        .translate-none {
          transform: translateY(0);
        }

        .translate-up {
          transform: translateY(-100%);
        }

        .nav-link {
          font-weight: 500;
          padding: 6px 12px;
          line-height: 1.5;
          color: white;
          text-decoration: none;
          position: relative;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          height: 40px;
        }

        .underline-anim::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          height: 3px;
          width: 0%;
          border-radius: 2px;
          background: linear-gradient(
            90deg,
            #003366 0%,
            white 50%,
            #003366 100%
          );
          transition: width 0.4s ease;
        }

        .underline-anim:hover::after {
          width: 100%;
        }

        .language-switch {
          background: none;
          border: none;
          cursor: pointer;
          color: white;
          font-weight: 500;
          position: relative;
          padding-bottom: 4px;
          display: flex;
          align-items: center;
          text-decoration: none;
        }

        @keyframes fadeSlideDown {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .mobile-menu-animated {
          animation: fadeSlideDown 0.5s ease forwards;
        }
        .lang-toggle-btn {
          background-color: #003366;
          color: white;
          border: 1px solid white;
          border-radius: 6px;
          padding: 6px 16px;
          transition: all 0.3s ease;
        }
        
        .lang-toggle-btn:hover {
          background-color: white;
          color: #003366;
        }
        /* Button same size as hamburger */
.lang-icon-btn {
  width: 32px;
  height: 32px;
  background-color: transparent;
  border: 1px solid white;
  color: white;
  font-weight: 600;
  font-size: 12px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.lang-icon-btn:hover {
  background-color: white;
  color: #003366;
}

      `}</style>
    </nav>
  );
};

export default Navbar;

