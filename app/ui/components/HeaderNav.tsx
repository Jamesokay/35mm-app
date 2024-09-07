"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const HeaderNav = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    if (typeof window !== "undefined") {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 10) {
        // If scrolling down, hide the navbar
        setShowNavbar(false);
      } else {
        // If scrolling up, show the navbar
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll); // Cleanup
      };
    }
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 flex items-center justify-between w-full h-16 px-24 gap-8 bg-gradient-to-r from-[#6c6576] to-[#251a33] z-50 transition-transform duration-500 delay-75 ease-in-out ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex items-center gap-16">
        <Link href="/">
          <div className="flex items-center text-5xl font-bold">
            35<span className="text-xs">mm</span>
          </div>
        </Link>
        <nav className="flex gap-8">
          <Link
            href="/movies"
            className="font-semibold text-35mm-off-white hover:text-white hover:scale-[1.025] hover:text-shadow-lg transition-all"
          >
            Movies
          </Link>
          <Link
            href="/tv"
            className="font-semibold text-35mm-off-white hover:text-white hover:scale-[1.025] transition-all"
          >
            TV Shows
          </Link>
          <Link
            href="/people"
            className="font-semibold text-35mm-off-white hover:text-white hover:scale-[1.025] transition-all"
          >
            People
          </Link>
        </nav>
      </div>
      <div className="flex items-center">
        <nav className="flex items-center gap-8">
          <Link
            href="/login"
            className="font-semibold text-35mm-off-white hover:text-white hover:scale-[1.025] transition-all"
          >
            Login
          </Link>
          <Link
            href="/sign-up"
            className="font-semibold text-35mm-green-bright border border-35mm-green-bright px-4 py-2 rounded-md transition-all duration-300 shadow-none hover:shadow-35mm-green-glow"
          >
            Sign Up
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default HeaderNav;
