import { ImageConfig } from "./types";

// Generate srcset based on available sizes and filePath
export const constructSrcSet = (
  config: ImageConfig | null,
  type: keyof Omit<ImageConfig, "secure_base_url" | "base_url">,
  filePath: string
): string => {
  if (!config || !filePath) return '';

  let availableSizes = config[type];

  // Filter out sizes greater than 500 and exclude "original" for poster_sizes
  if (type === 'poster_sizes') {
    availableSizes = availableSizes.filter(size => {
      const width = getWidthFromSize(size); // Extract the numeric width
      return width !== null && width <= 500; // Keep sizes that are <= 500, exclude "original"
    });
  }

  // Construct the srcset by mapping sizes to the appropriate URL
  const srcSet = availableSizes
    .map((size) => {
      const width = getWidthFromSize(size); // Get the width from the size string
      return `${config.secure_base_url || config.base_url}${size}/${filePath} ${width}w`;
    })
    .join(", ");

  return srcSet;
};


// Helper function to extract the numeric width from the size string
const getWidthFromSize = (size: string): number => {
  // For example, if size is 'w500', return 500
  const match = size.match(/^w(\d+)$/);
  return match ? parseInt(match[1], 10) : 0; // Return 0 for 'original' or invalid sizes
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