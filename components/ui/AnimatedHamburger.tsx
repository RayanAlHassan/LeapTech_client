"use client";
import React from "react";

interface AnimatedHamburgerProps {
  isOpen: boolean;
  toggle: () => void;
}

const AnimatedHamburger: React.FC<AnimatedHamburgerProps> = ({ isOpen, toggle }) => {
  return (
    <button
      aria-label="Toggle Menu"
      onClick={toggle}
      style={{
        width: "32px",
        height: "32px",
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        padding: 0,
      }}
    >
      <span
        style={{
          display: "block",
          width: "100%",
          height: "4px",
          backgroundColor: "white",
          borderRadius: "2px",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.5s ease",
          transformOrigin: "center",
          transform: isOpen
            ? "rotate(45deg) translate(6px, 6px)"
            : "rotate(0deg) translate(0, 0)",
        }}
      />
      <span
        style={{
          display: "block",
          width: "100%",
          height: "4px",
          backgroundColor: "white",
          borderRadius: "2px",
          transition: "opacity 0.4s ease 0.1s",
          opacity: isOpen ? 0 : 1,
        }}
      />
      <span
        style={{
          display: "block",
          width: "100%",
          height: "4px",
          backgroundColor: "white",
          borderRadius: "2px",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.5s ease",
          transformOrigin: "center",
          transform: isOpen
            ? "rotate(-45deg) translate(6px, -6px)"
            : "rotate(0deg) translate(0, 0)",
        }}
      />
    </button>
  );
};

export default AnimatedHamburger;
