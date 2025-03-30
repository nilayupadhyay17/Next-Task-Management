'use client'; 
import React from "react";

export const Input = ({ type = "text", value, onChange, placeholder }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="px-4 py-2 border rounded-lg w-full"
    />
  );
};
