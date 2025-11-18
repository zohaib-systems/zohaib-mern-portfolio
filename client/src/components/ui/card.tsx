"use client";

import React from "react";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div className={`rounded-xl shadow-md p-6 bg-gray-800 ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

export default Card;
