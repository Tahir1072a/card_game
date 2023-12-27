import "../../Css/kart.css";
import React from "react";

export function CardButton({
  onClick,
  children,
  className = "",
  disabled = false,
}) {
  return (
    <button
      className={`kartButton ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
