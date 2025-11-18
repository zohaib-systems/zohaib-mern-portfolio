"use client";

import React from "react";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "secondary";
  className?: string;
};

export function Badge({ children, variant = "default", className = "", ...props }: BadgeProps) {
  const variantCls = variant === "secondary" ? "bg-gray-700 text-gray-200" : "bg-purple-600 text-white";
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${variantCls} ${className}`.trim()} {...props}>
      {children}
    </span>
  );
}

export default Badge;
