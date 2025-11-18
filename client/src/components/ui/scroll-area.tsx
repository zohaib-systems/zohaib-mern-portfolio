"use client";

import React from "react";

type ScrollAreaProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export function ScrollArea({ children, className = "", ...props }: ScrollAreaProps) {
  return (
    <div className={`overflow-auto ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

export default ScrollArea;
