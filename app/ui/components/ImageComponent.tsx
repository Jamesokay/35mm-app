"use client";

import { useImageConfig } from "@/app/context/ImageConfigContext";
import { constructSrcSet } from "@/app/lib/helpers";
import { ImageConfig } from "@/app/lib/types";
import { FC } from "react";

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

  if (!filePath) return '';

  // Construct srcset using the available sizes from the config
  const srcSet = constructSrcSet(config, type, filePath);
  const defaultSize = config?.[type]?.[0]; // Use the smallest size as the default src

  return (
    <img
      className={className}
      src={`${
        config?.secure_base_url || config?.base_url || ""
      }${defaultSize}/${filePath}`} // Fallback to a default size
      srcSet={srcSet} // Add the srcset for responsive images
      alt={alt}
    />
  );
};

export default ImageComponent;
