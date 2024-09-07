import { Genre, ImageConfig } from "./types";

// Generate srcset based on available sizes and filePath
export const constructSrcSet = (
  config: ImageConfig | null,
  type: keyof Omit<ImageConfig, "secure_base_url" | "base_url">,
  filePath: string
): string => {
  if (!config || !filePath) return '';

  const availableSizes = config[type];

  // Construct the srcset by mapping sizes to the appropriate URL
  const srcSet = availableSizes
    .map(
      (size) =>
        `${
          config.secure_base_url || config.base_url
        }${size}/${filePath} ${getWidthFromSize(size)}w`
    )
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

export const formatGenres = (genres: Genre[]): string => {
  return genres.map((genre) => genre.name).join(", ");
};
