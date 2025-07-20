// components/ui/PrimaryButton.tsx
"use client";

import React from "react";

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}
interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // other props if any
}
const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    children,
    onClick,
    type = "button",
    className = "",
    disabled,
  }) => {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`primary-button ${className}`}
      >
        {children}
      </button>
    );
  };
  
export default PrimaryButton;
