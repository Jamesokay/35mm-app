"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";

const HeaderNav = () => {
  const [transparentNavbar, setTransparentNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    if (typeof window !== "undefined") {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 10) {
        // If scrolling down, hide the navbar
        setTransparentNavbar(false);
      } else {
        // If scrolling up, show the navbar
        setTransparentNavbar(true);
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
      className={`fixed top-0 left-0 flex w-full h-16 px-24 gap-8 z-50 transition-all duration-500 ease-in-out ${
        transparentNavbar ? "" : "shadow-lg bg-35mm-black-header"
      }`}
    >
      <div className="relative w-full h-full">
        <div className={`bg-header-`}></div>
        <div className="absolute flex items-center justify-between h-full w-full">
          <div className="flex items-center gap-16">
            <Link href="/">
              <div
                className={`flex items-center text-5xl font-bold transition-colors duration-500 ${
                  transparentNavbar ? "" : "text-35mm-green-bright"
                }`}
              >
                <span className="overlay-text">35</span>
                <span className="text-xs">mm</span>
              </div>
            </Link>
            {/* <nav className="flex gap-8">
          <Link
            href="/movies"
            className="font-semibold text-lg overlay-text text-35mm-off-white hover:text-white transition-colors"
          >
            Movies
          </Link>
          <Link
            href="/tv"
            className="font-semibold text-lg overlay-text text-35mm-off-white hover:text-white transition-colors"
          >
            TV Shows
          </Link>
          <Link
            href="/people"
            className="font-semibold text-lg overlay-text text-35mm-off-white hover:text-white transition-colors"
          >
            People
          </Link>
        </nav> */}
          </div>

          <div className="flex items-center gap-8">
            <SearchBar />
            <nav className="flex items-center gap-8">
              <Link
                href="/login"
                className="font-semibold text-lg overlay-text text-35mm-off-white hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                href="/sign-up"
                className={`font-semibold text-lg overlay-text border px-4 py-2 rounded-md transition-all ease-in-out duration-500 shadow-none ${
                  transparentNavbar
                    ? "border-transparent"
                    : "text-35mm-green-bright border-35mm-green-bright hover:shadow-35mm-green-glow"
                }`}
              >
                Sign Up
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderNav;
