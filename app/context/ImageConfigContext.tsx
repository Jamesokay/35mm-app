'use client';

import { createContext, useContext, ReactNode } from "react";
import { ImageConfig } from "@/app/lib/types";

const ImageConfigContext = createContext<ImageConfig | null>(null);

export const useImageConfig = () => {
  const context = useContext(ImageConfigContext);
  if (!context) throw new Error("useImageConfig must be used within an ImageConfigProvider");
  return context;
};

export const ImageConfigProvider = ({
  children,
  config,
}: {
  children: ReactNode;
  config: ImageConfig | null;
}) => {
  return (
    <ImageConfigContext.Provider value={config}> {/* Provide the config globally */}
      {children}
    </ImageConfigContext.Provider>
  );
};
