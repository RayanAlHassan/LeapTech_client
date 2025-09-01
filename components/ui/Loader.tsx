// components/Loader.tsx
// import React from "react";

// export default function Loader() {
//   return (
//     <div className="loading-overlay d-flex justify-content-center align-items-center">
//       <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
//         <span className="visually-hidden">Loading...</span>
//       </div>
//     </div>
//   );
// }
// components/Loader.tsx
// components/Loader.tsx
import React from "react";

export default function Loader() {
  const text = "LeapTech";

  return (
    <div className="loader-overlay d-flex justify-content-center align-items-center">
      <div className="loader-text">
        {text.split("").map((char, index) => (
          <span
            key={index}
            className="loader-char"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {char}
          </span>
        ))}
      </div>
      <style jsx>
        {`
        /* components/Loader.css */

        /* Full screen gradient overlay */
        .loader-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #0b1f4d, #13294b, #0a1a3f);
          z-index: 9999;
        }
        
        /* Centered text container */
        .loader-text {
          font-size: 3rem;
          font-weight: bold;
          color: white;
          display: flex;
          gap: 0.3rem;
        }
        
        /* Animation for each character */
        @keyframes wave {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px); /* move up 20px */
          }
        }
        
        .loader-char {
          display: inline-block;
          animation: wave 0.6s ease-in-out infinite;
        }
        
        `}
      </style>
    </div>
  );
}
