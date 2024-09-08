'use client'

import { ReactNode, useRef, useState, useEffect } from "react";
import ArrowIcon from "../svg/ArrowIcon";

const Slider: React.FC<{ children: ReactNode; title: string, secondaryButton?: ReactNode }> = ({ children, title, secondaryButton = null  }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const maxScrollLeft = slider.scrollWidth - slider.clientWidth;

    // Show or hide arrows based on scroll position
    setShowLeftArrow(slider.scrollLeft > 0);
    setShowRightArrow(slider.scrollLeft < maxScrollLeft);
  };

  const scrollRight = () => {
    const slider = sliderRef.current;
    if (!slider) return;
    slider.scrollBy({ left: slider.clientWidth, behavior: "smooth" });
  };

  const scrollLeft = () => {
    const slider = sliderRef.current;
    if (!slider) return;
    slider.scrollBy({ left: -slider.clientWidth, behavior: "smooth" });
  };

  useEffect(() => {
    handleScroll(); // Check scroll position on initial load
  }, []);

  return (
    <div className="flex flex-col w-full relative">
      <div className="flex gap-8 px-24 w-full">
        <h2 className="text-3xl font-semibold">{title}</h2>
        {secondaryButton}
      </div>

      <div className="relative w-full">
        <button
          aria-label="Scroll left"
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[rgba(16,16,16,0.8)] to-transparent h-full w-24 flex items-center justify-center text-white p-2 z-50 transition-opacity duration-300 ${
            showLeftArrow ? "opacity-100" : "opacity-0"
          }`}
          onClick={scrollLeft}
        >
          <div className="flex flex-col h-8 w-8 text-white rotate-180">
            <ArrowIcon />
          </div>
        </button>
        <div
          className="flex gap-4 px-24 py-8 overflow-x-scroll scrollbar-hide scroll-snap-x"
          ref={sliderRef}
          onScroll={handleScroll}
          style={{ scrollSnapType: "x mandatory" }}
        >
          {children}
        </div>
        <button
          aria-label="Scroll right"
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-l from-[rgba(16,16,16,0.8)] to-transparent h-full w-24 flex items-center justify-center text-white p-2 z-50 transition-opacity duration-300 ${
            showRightArrow ? "opacity-100" : "opacity-0"
          }`}
          onClick={scrollRight}
        >
          <div className="flex flex-col h-8 w-8 text-white">
            <ArrowIcon />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Slider;
