/**
 *  @path src/components/ui/CircularProgress.tsx
 */

"use client";

import { useEffect, useState, FC } from "react";
import colors from "tailwindcss/colors";

/**
 * Get color based on percentage using Tailwind CSS colors
 * @param {number} percentage
 * @returns {string} Color value
 */
const getColor = (percentage: number): string => {
  if (percentage <= 25) return colors.red[500];
  if (percentage <= 50) return colors.yellow[500];
  if (percentage <= 75) return colors.blue[500];
  return colors.green[500];
};

/**
 * Props for CircularProgress component
 */
type CircularProgressProps = {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  animation?: boolean;
  dynamicColors?: boolean;
  color?: string;
};

/**
 * Render a circular progress bar with a percentage, dynamic color, and animation control
 */
const CircularProgress: FC<CircularProgressProps> = ({
  percentage,
  size = 40,
  strokeWidth = 4,
  animation = true,
  dynamicColors = true,
  color = "#4caf50",
}) => {
  const [animatedPercentage, setAnimatedPercentage] = useState<number>(0);

  useEffect(() => {
    setAnimatedPercentage(percentage);
  }, [percentage]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedPercentage / 100) * circumference;

  const strokeColor = dynamicColors ? getColor(percentage) : color;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-label={`Progress: ${percentage}%`}
    >
      {/* Background circle */}
      <circle
        stroke="#e6e6e6"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      {/* Foreground circle */}
      <circle
        stroke={strokeColor}
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{
          transition: animation
            ? "stroke-dashoffset 1s ease-out, stroke 0.35s ease-out"
            : "none",
        }}
      />
      {/* Percentage text */}
      <text
        x="50%"
        y="50%"
        dy=".3em"
        textAnchor="middle"
        fontSize={size / 4}
        fill="#000"
        fontWeight="bold"
      >
        {`${percentage}%`}
      </text>
    </svg>
  );
};

export default CircularProgress;
