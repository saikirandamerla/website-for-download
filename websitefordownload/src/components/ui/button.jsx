import React from "react";

export const Button = ({ children, className = "", onClick, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition ${className}`}
    >
      {children}
    </button>
  );
};