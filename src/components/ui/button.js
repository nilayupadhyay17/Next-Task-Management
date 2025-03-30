'use client';
import React from "react";
 
export const Button = ({ onClick, children, className }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 ${className}`}
    >
      {children}
    </button>
  );
};
