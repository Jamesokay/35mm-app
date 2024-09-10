"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import SearchIcon from "../svg/SearchIcon";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [previousRoute, setPreviousRoute] = useState<string | null>(null);
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Store the current route when the search bar first receives input
    if (searchQuery && !previousRoute) {
      setPreviousRoute(window.location.pathname);
    }
  }, [searchQuery, previousRoute]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Clear the existing timeout if it exists
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // If the user clears the search bar, return to the previous route
    if (query === "" && previousRoute) {
      console.log("go to" + previousRoute);
      router.push(previousRoute); // Navigate back to the previously stored route
      setPreviousRoute(null);
    } else {
      // Set a new timeout to debounce the search
      timeoutRef.current = setTimeout(() => {
        if (query) {
          const encodedQuery = encodeURIComponent(query);
          router.push(`/search?q=${encodedQuery}`);
        }
      }, 300); // 300ms debounce time
    }
  };

  const handleExpand = (expanded: boolean) => {
    if (expanded) {
      setShowSearchBar(false);
      inputRef.current?.blur();
    } else {
      setShowSearchBar(true);
      inputRef.current?.focus();
    }
  };

  return (
    <div
      className={`flex items-center rounded-md transition-all duration-500 ease-in-out  ${
        showSearchBar ? "w-[500px] bg-35mm-black-dark-opal" : "w-8"
      }`}
    >
      <button
        aria-label="Expand search bar"
        className="flex px-2"
        onClick={() => handleExpand(showSearchBar)}
      >
        <span className="w-6 h-6">
          <SearchIcon />
        </span>
      </button>
      <input
        ref={inputRef}
        className={`py-2 bg-transparent text-white placeholder:text-gray-400 outline-none focus:outline-none transition-all duration-500 ease-in-out ${
          showSearchBar ? "opacity-100 w-[500px]" : "opacity-0 w-[0px]"
        }`}
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search for movies, shows and people..."
      />
    </div>
  );
};

export default SearchBar;
