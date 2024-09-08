"use client";

import { useImageConfig } from "@/app/context/ImageConfigContext";
import { constructSrcSet } from "@/app/lib/helpers";
import { ImageConfig } from "@/app/lib/types";
import { FC, useEffect, useRef, useState } from "react";

interface ImageProps {
  type: keyof Omit<ImageConfig, "secure_base_url" | "base_url">;
  filePath: string;
  alt?: string;
  className?: string;
}

const ImageComponent: FC<ImageProps> = ({
  type,
  filePath,
  alt,
  className = "",
}) => {
  const config = useImageConfig();
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  // Construct srcset using the available sizes from the config
  const srcSet = constructSrcSet(config, type, filePath);
  const defaultSize = config?.[type]?.[0]; // Use the smallest size as the default src

  useEffect(() => {
    if (imageRef.current?.complete) setLoaded(true);
  }, [])

  return (
    <div className={`relative flex ${className} overflow-hidden`}>
      <div
        className={`absolute w-full h-full transition-all duration-300 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="w-full h-full bg-gray-700 animate-pulse"></div>
      </div>
      <img
        ref={imageRef}
        className={`h-full w-full transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        src={`${
          config?.secure_base_url || config?.base_url || ""
        }${defaultSize}/${filePath}`} // Fallback to a default size
        srcSet={srcSet} // Add the srcset for responsive images
        alt={alt}
        onLoad={() => {
          setLoaded(true);
        }}
        loading="lazy"
      />
    </div>
  );
};

export default ImageComponent;
