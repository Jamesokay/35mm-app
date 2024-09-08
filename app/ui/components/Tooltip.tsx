"use client";

import { useState, useRef, ReactNode, FC } from "react";

interface TooltipProps {
  text: string;
  children: ReactNode;
}

const Tooltip: FC<TooltipProps> = ({ text, children }) => {
  const [visible, setVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          ref={tooltipRef}
          className="w-max absolute left-1/2 transform -translate-x-1/2 top-full mt-3 px-2 py-1 bg-35mm-black-header text-white text-sm rounded shadow-lg z-20"
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
