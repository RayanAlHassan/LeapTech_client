// components/ui/PrimaryButton.tsx
"use client";

import React from "react";

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}
const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    children,
    onClick,
    type = "button",
    className = "",
  }) => {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`primary-button ${className}`}
      >
        {children}
      </button>
    );
  };
  
export default PrimaryButton;
