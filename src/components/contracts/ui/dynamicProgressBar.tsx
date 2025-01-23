import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import colors from "tailwindcss/colors";

/**
 * Get color based on percentage using Tailwind CSS colors
 * @param percentage - The current progress percentage
 * @returns {string} Color value based on percentage
 */
const getColor = (percentage: number): string => {
  if (percentage <= 25) return colors.red[500];
  if (percentage <= 50) return colors.yellow[500];
  if (percentage <= 75) return colors.blue[500];
  return colors.green[500];
};

/**
 * Props for the DynamicProgressBar component
 */
type DynamicProgressBarProps = {
  percentage: number;
  animation?: boolean;
  dynamicColors?: boolean;
  color?: string;
};

/**
 * DynamicProgressBar component with customizable props and dynamic color.
 */
const DynamicProgressBar: React.FC<DynamicProgressBarProps> = ({
  percentage,
  animation = true,
  dynamicColors = true,
  color = "#4caf50", // Default static color
}) => {
  const [animatedPercentage, setAnimatedPercentage] = useState<number>(0);

  useEffect(() => {
    setAnimatedPercentage(percentage);
  }, [percentage, animation]);

  // Determine progress bar color
  const progressBarColor = dynamicColors ? getColor(percentage) : color;

  return (
    <div
      className="h-2 relative w-full overflow-hidden rounded-full bg-secondary"
      style={{
        backgroundColor: "#e6e6e6", // Track background color
      }}
    >
      <div
        className="h-full flex-1 transition-all"
        style={{
          width: `${animatedPercentage}%`,
          backgroundColor: progressBarColor,
          transition: animation
            ? "width 1s ease-out, background-color 0.35s"
            : "none",
        }}
      />
    </div>
  );
};

export default DynamicProgressBar;
