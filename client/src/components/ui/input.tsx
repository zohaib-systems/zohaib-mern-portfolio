"use client";

import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`px-3 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 ${className}`.trim()}
      {...props}
    />
  );
}

export default Input;
