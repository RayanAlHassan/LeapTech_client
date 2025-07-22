"use client";

import React from "react";

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  onClick,
  type = "button",
  className = "",
  disabled,
  ...rest // allow other button props like aria-label, etc.
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`primary-button ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
