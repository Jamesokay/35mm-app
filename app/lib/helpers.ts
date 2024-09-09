import { ImageConfig } from "./types";

export const constructSrcSet = (
  config: ImageConfig | null,
  type: keyof Omit<ImageConfig, "secure_base_url" | "base_url">,
  filePath: string,
  omitLargeSizes: boolean // new parameter to control whether large sizes should be excluded
): string => {
  if (!config || !filePath) return '';

  let availableSizes = config[type];

  // Filter out large sizes based on omitLargeSizes condition
  if (omitLargeSizes) {
    availableSizes = availableSizes.filter(size => {
      const sizeValue = getSizeValue(size); // Extract numeric width/height
      return sizeValue !== null && sizeValue <= 500; // Omit sizes > 500 (height or width), and 'original'
    });
  }

  // Construct the srcset by mapping sizes to the appropriate URL
  const srcSet = availableSizes
    .map((size) => {
      const sizeValue = getSizeValue(size); // Get numeric size (width or height)
      return size === 'original' 
        ? `${config.secure_base_url || config.base_url}${size}/${filePath} ${sizeValue || 1000}w` // Fallback value for 'original'
        : `${config.secure_base_url || config.base_url}${size}/${filePath} ${sizeValue}w`;
    })
    .join(", ");

  return srcSet;
};

// Helper function to extract the numeric width/height from the size string
const getSizeValue = (size: string): number | null => {
  const widthMatch = size.match(/^w(\d+)$/); // Match width-based sizes (e.g., 'w500')
  const heightMatch = size.match(/^h(\d+)$/); // Match height-based sizes (e.g., 'h500')
  
  if (widthMatch) {
    return parseInt(widthMatch[1], 10); // Return numeric width
  }
  if (heightMatch) {
    return parseInt(heightMatch[1], 10); // Return numeric height
  }
  
  return size === 'original' ? null : 0; // Return null for 'original', otherwise 0 for invalid sizes
};


export const convertVoteAverageToPercentage = (num: number): number => {
  return Math.round(num * 10);
};

export const formatDateString = (dateString: string): string => {
  const date = new Date(dateString);

  // Extract the day, month, and year
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" }); // Get the short month name
  const year = date.getFullYear();

  // Return formatted string
  return `${day} ${month} ${year}`;
};

export const formatMovieDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}mins`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remainingMinutes}m`;
};