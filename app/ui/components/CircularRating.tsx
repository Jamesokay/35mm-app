import { FC } from "react";

const CircularRating: FC<{ percentage: number; size?: number }> = ({
  percentage,
  size = 46,
}) => {
  const radius = (size - 10) / 2; // Adjust radius based on size, with more padding
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={size} height={size}>
      {/* Outer Circle (Background with Padding) */}
      <circle
        stroke="none"
        fill="black"
        r={(size - 2) / 2}
        cx={size / 2}
        cy={size / 2}
      />
      {/* Background Circle */}
      <circle
        stroke="rgba(0, 0, 0, 0.2)"
        fill="transparent"
        strokeWidth="8"
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      {/* Progress Circle */}
      <circle
        stroke={percentage >= 70 ? "#4CAF50" : "#f0e224"}
        fill="transparent"
        strokeWidth="2"
        r={radius}
        cx={size / 2}
        cy={size / 2}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`} // Rotate to start at 12 o'clock
        className="transition-all duration-300 ease-out"
      />
      {/* Percentage Text */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        fontSize="12"
        fill="white"
        fontWeight="bold"
      >
        {percentage}
      </text>
    </svg>
  );
};

export default CircularRating;
