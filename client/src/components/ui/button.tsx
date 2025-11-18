"use client";

import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "secondary";
  className?: string;
};

export function Button({ children, size = "md", variant = "default", className = "", ...props }: ButtonProps) {
  const sizeCls = size === "lg" ? "px-8 py-4 text-lg" : size === "sm" ? "px-3 py-1 text-sm" : "px-4 py-2";
  const variantCls =
    variant === "outline"
      ? "bg-transparent border border-current"
      : variant === "secondary"
      ? "bg-gray-700 text-white"
      : "bg-purple-600 text-white";

  return (
    <button className={`${sizeCls} ${variantCls} rounded ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}

export default Button;
